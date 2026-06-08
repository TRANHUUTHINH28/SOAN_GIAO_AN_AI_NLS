import mammoth from "mammoth";

/**
 * Parses uploaded .docx files to get raw text content.
 */
export async function parseDocxFile(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = async (e) => {
      try {
        const arrayBuffer = e.target?.result as ArrayBuffer;
        const result = await mammoth.extractRawText({ arrayBuffer });
        resolve(result.value);
      } catch (err) {
        reject(err);
      }
    };
    reader.onerror = (err) => reject(err);
    reader.readAsArrayBuffer(file);
  });
}

/**
 * Transforms Markdown string syntax into standard formatted basic HTML.
 */
export function markdownToHtmlForWord(markdown: string): string {
  // 1. Initial escape of generic special characters
  let html = markdown
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");

  // 2. Unescape specific safe formatting tags so that they can be parsed by Word correctly!
  html = html
    .replace(/&lt;br\s*\/?&gt;/gi, "<br />")
    .replace(/&lt;b&gt;/gi, "<b>")
    .replace(/&lt;\/b&gt;/gi, "</b>")
    .replace(/&lt;strong&gt;/gi, "<strong>")
    .replace(/&lt;\/strong&gt;/gi, "</strong>")
    .replace(/&lt;i&gt;/gi, "<i>")
    .replace(/&lt;\/i&gt;/gi, "</i>")
    .replace(/&lt;u&gt;/gi, "<u>")
    .replace(/&lt;\/u&gt;/gi, "</u>");

  // 3. Restore raw characters within math equations wrapped in $...$ for 100% MathType/Toggle TeX compatibility
  html = html.replace(/\$([\s\S]+?)\$/g, (match, formula) => {
    const unescaped = formula
      .replace(/&amp;/g, "&")
      .replace(/&lt;/g, "<")
      .replace(/&gt;/g, ">");
    return `$${unescaped}$`;
  });

  const lines = html.split("\n");
  let inTable = false;
  let tableRows: string[] = [];
  const processedLines: string[] = [];

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();
    if (line.startsWith("|")) {
      if (!inTable) {
        inTable = true;
        tableRows = [];
      }
      const cells = line
        .split("|")
        .map((c) => c.trim())
        .filter((_, idx, arr) => idx > 0 && idx < arr.length - 1);

      // Robust check for table separators (e.g. |:---| or |---| or |:--:| or autofitted Word dashes like :-– or :—), ensuring no trailing markdown artifacts leak
      const isSeparator = cells.length > 0 && cells.every((c) => {
        const trimmed = c.trim();
        return (
          trimmed.length > 0 &&
          /^[:\-–—\s]+$/.test(trimmed) &&
          (trimmed.includes("-") || trimmed.includes("–") || trimmed.includes("—"))
        );
      });

      if (!isSeparator) {
        tableRows.push(cells.join("@@@"));
      }
    } else {
      if (inTable) {
        let tableHtml = `<table style="width: 100%; table-layout: fixed; border-collapse: collapse; border: 1.5px solid #0f766e; margin: 15px 0;">\n`;
        tableRows.forEach((row, rowIdx) => {
          const cells = row.split("@@@");
          const colWidth = Math.floor(100 / cells.length);
          tableHtml += "  <tr>\n";
          cells.forEach((cell) => {
            if (rowIdx === 0) {
              tableHtml += `    <th style="width: ${colWidth}%; border: 1.5px solid #0f765e; padding: 10px; background-color: #f0fdfa; font-weight: bold; font-family: 'Times New Roman', serif; font-size: 11pt; text-align: center; color: #0f766e;">${cell}</th>\n`;
            } else {
              tableHtml += `    <td style="width: ${colWidth}%; border: 1.5px solid #cbd5e1; padding: 10px; font-family: 'Times New Roman', serif; font-size: 10.5pt; vertical-align: top; text-align: left; line-height: 1.35;">${cell}</td>\n`;
            }
          });
          tableHtml += "  </tr>\n";
        });
        tableHtml += "</table>\n";
        processedLines.push(tableHtml);
        inTable = false;
      }
      processedLines.push(lines[i]);
    }
  }

  if (inTable) {
    let tableHtml = `<table style="width: 100%; table-layout: fixed; border-collapse: collapse; border: 1.5px solid #0f766e; margin: 15px 0;">\n`;
    tableRows.forEach((row, rowIdx) => {
      const cells = row.split("@@@");
      const colWidth = Math.floor(100 / cells.length);
      tableHtml += "  <tr>\n";
      cells.forEach((cell) => {
        if (rowIdx === 0) {
          tableHtml += `    <th style="width: ${colWidth}%; border: 1.5px solid #0f765e; padding: 10px; background-color: #f0fdfa; font-weight: bold; font-family: 'Times New Roman', serif; font-size: 11pt; text-align: center; color: #0f766e;">${cell}</th>\n`;
        } else {
          tableHtml += `    <td style="width: ${colWidth}%; border: 1.5px solid #cbd5e1; padding: 10px; font-family: 'Times New Roman', serif; font-size: 10.5pt; vertical-align: top; text-align: left; line-height: 1.35;">${cell}</td>\n`;
        }
      });
      tableHtml += "  </tr>\n";
    });
    tableHtml += "</table>\n";
    processedLines.push(tableHtml);
  }

  html = processedLines.join("\n");

  // Parse code blocks with mono family styling
  html = html.replace(
    /```([\s\S]*?)```/g,
    '<pre style="background: #f4f4f5; padding: 12px; border-left: 4px solid #0f766e; font-family: Consolas, Courier New, monospace; font-size: 9.5pt; margin: 10px 0;">$1</pre>'
  );

  // Bold strings
  html = html.replace(/\*\*([\s\S]*?)\*\*/g, "<strong>$1</strong>");

  // Italic strings
  html = html.replace(/\*([\s\S]*?)\*/g, "<i>$1</i>");

  // Translate horizontal rules & blockquotes safely
  html = html.replace(/^\s*(?:-{3,}|\*{3,}|_{3,})\s*$/gm, '<hr style="border: none; border-top: 1px solid #cbd5e1; margin: 15px 0;" />');
  html = html.replace(/^\s*>\s+(.*$)/gim, '<blockquote style="border-left: 3px solid #0f766e; padding-left: 10px; color: #475569; margin: 10px 0; font-style: italic;">$1</blockquote>');

  // Support styling of original images, diagrams, graphs and visual placeholders
  // Match structure: [HÌNH VẼ: Thầy/Cô cắt...] or [HÌNH VẼ GỐC...] or tags wrapped in bracket patterns showing image expectations
  const imageBoxStyle = 'border: 2px dashed #be123c; background-color: #fff1f2; color: #be123c; padding: 12px; margin: 14px 0; text-align: center; font-family: Arial, sans-serif; font-size: 10.5pt; font-weight: bold; border-radius: 6px;';
  
  html = html.replace(
    /(?:🖼️\s*)?\[(?:HÌNH\s*VẼ|HÌNH\s*VẼ\s*GỐC|SƠ\s*ĐỒ|ĐỒ\s*THỊ|MINH\s*HỌA|ẢNH)(?::\s*|]|\s+[^\]]*\])/gi,
    '<div style="' + imageBoxStyle + '">🖼️ [VỊ TRÍ GHÉP HÌNH: Thầy/Cô hãy cắt hình vẽ, đồ thị từ giáo án gốc dán trực tiếp vào ô này]</div>'
  );

  // Headings with specific margin and size attributes for clean Word document layout (longest to shortest headings)
  // Supports optional leading whitespaces to prevent alignment issues
  html = html.replace(/^\s*###### (.*$)/gim, '<h6 style="color: #475569; font-family: Arial, sans-serif; font-size: 10pt; font-weight: bold; margin-top: 6pt; margin-bottom: 2pt;">$1</h6>');
  html = html.replace(/^\s*##### (.*$)/gim, '<h5 style="color: #0f766e; font-family: Arial, sans-serif; font-size: 10.5pt; font-weight: bold; margin-top: 8pt; margin-bottom: 2pt;">$1</h5>');
  html = html.replace(/^\s*#### (.*$)/gim, '<h4 style="color: #334155; font-family: Arial, sans-serif; font-size: 11pt; font-weight: bold; margin-top: 10pt; margin-bottom: 4pt;">$1</h4>');
  html = html.replace(/^\s*### (.*$)/gim, '<h3 style="color: #1e293b; font-family: Arial, sans-serif; font-size: 12pt; font-weight: bold; margin-top: 12pt; margin-bottom: 4pt;">$1</h3>');
  html = html.replace(/^\s*## (.*$)/gim, '<h2 style="color: #0f766e; font-family: Arial, sans-serif; font-size: 14pt; font-weight: bold; border-bottom: 1.5px solid #0f766e; padding-bottom: 2px; margin-top: 16pt; margin-bottom: 6pt;">$1</h2>');
  html = html.replace(/^\s*# (.*$)/gim, '<h1 style="color: #0f766e; font-family: Arial, sans-serif; font-size: 18pt; font-weight: bold; margin-top: 20pt; margin-bottom: 10pt; text-align: center; text-transform: uppercase;">$1</h1>');

  // Handle standard lists
  const words = html.split("\n");
  let inList = false;
  let inOrderedList = false;
  const finalHtmlLines: string[] = [];

  for (let j = 0; j < words.length; j++) {
    const line = words[j];

    if (line.trim().startsWith("- ") || line.trim().startsWith("* ")) {
      if (inOrderedList) {
        finalHtmlLines.push("</ol>");
        inOrderedList = false;
      }
      if (!inList) {
        finalHtmlLines.push('<ul style="margin-top: 0; margin-bottom: 6pt; padding-left: 20pt;">');
        inList = true;
      }
      const content = line.replace(/^\s*[-*]\s+/, "");
      finalHtmlLines.push(`  <li style="margin-bottom: 3pt; font-size: 11pt;">${content}</li>`);
    } else if (/^\s*\d+\.\s+/.test(line)) {
      if (inList) {
        finalHtmlLines.push("</ul>");
        inList = false;
      }
      if (!inOrderedList) {
        finalHtmlLines.push('<ol style="margin-top: 0; margin-bottom: 6pt; padding-left: 20pt;">');
        inOrderedList = true;
      }
      const content = line.replace(/^\s*\d+\.\s+/, "");
      finalHtmlLines.push(`  <li style="margin-bottom: 3pt; font-size: 11pt;">${content}</li>`);
    } else {
      if (inList) {
        finalHtmlLines.push("</ul>");
        inList = false;
      }
      if (inOrderedList) {
        finalHtmlLines.push("</ol>");
        inOrderedList = false;
      }

      const trimmed = line.trim();
      if (
        trimmed &&
        !trimmed.startsWith("<h") &&
        !trimmed.startsWith("<table") &&
        !trimmed.startsWith("</table") &&
        !trimmed.startsWith("<tr") &&
        !trimmed.startsWith("<td") &&
        !trimmed.startsWith("<th") &&
        !trimmed.startsWith("<pre") &&
        !trimmed.startsWith("</pre>") &&
        !trimmed.startsWith("<ul") &&
        !trimmed.startsWith("<ol") &&
        !trimmed.startsWith("<hr") &&
        !trimmed.startsWith("<blockquote") &&
        !trimmed.startsWith("</blockquote")
      ) {
        finalHtmlLines.push(`<p style="margin: 0 0 6pt 0; text-align: justify; font-size: 11pt;">${line}</p>`);
      } else {
        finalHtmlLines.push(line);
      }
    }
  }

  if (inList) finalHtmlLines.push("</ul>");
  if (inOrderedList) finalHtmlLines.push("</ol>");

  html = finalHtmlLines.join("\n");

  // Highly robust crimson highlighting for Word export
  const roseColor = "#be123c"; // Deep crimson rose
  
  // Tag keywords we expect to be styled in beautiful solid crimson red
  const tagKeywords = [
    "Tích hợp NLS & AI",
    "Giáo viên hướng dẫn",
    "Học sinh thực hiện",
    "Sản phẩm số hoặc sản phẩm AI",
    "Sản phẩm số",
    "Đánh giá",
    "Giáo viên",
    "Học sinh",
    "Sản phẩm"
  ];
  
  tagKeywords.forEach(tag => {
    // Escape matching for brackets e.g. [Tích hợp NLS & AI] or 🔴 [Tích hợp NLS & AI] or 🔎 [Giáo viên hướng dẫn]
    const regex1 = new RegExp(`((?:🔴|🔎|👤|📊|⚠️)?\\s*\\[${tag}\\])`, "gi");
    html = html.replace(regex1, `<span style="color: ${roseColor}; font-weight: bold;">$1</span>`);
    
    // Support standard colon layouts, e.g. 🔴 Giáo viên hướng dẫn:
    const regex2 = new RegExp(`(🔴\\s*${tag}(?:\\s*[:\\-]|$))`, "gi");
    html = html.replace(regex2, `<span style="color: ${roseColor}; font-weight: bold;">$1</span>`);
  });

  // Catch general 🔴 [anything inside brackets] and highlight red
  html = html.replace(/(🔴\s*\[[^\]]+\])/gi, `<span style="color: ${roseColor}; font-weight: bold;">$1</span>`);

  // Ensure every remaining 🔴 emoji is colored and bold
  html = html.replace(/(🔴)/g, `<strong style="color: ${roseColor};">🔴</strong>`);

  return html;
}

/**
 * Compiles output markdown and downloads as genuine Microsoft Word file (.doc).
 */
export function downloadIntegratedAsDoc(markdownContent: string, title: string) {
  const htmlBody = markdownToHtmlForWord(markdownContent);
  const formattedTitle = title ? title.replace(/[^\w\s\-\u00C0-\u1EF9]/gi, "") : "Giao_An_Vat_Li_Tich_Hop";
  const fileName = `${formattedTitle.trim().replace(/\s+/g, "_")}_Tich_Hop_So.doc`;

  const docEnvelope = `
    <html xmlns:o='urn:schemas-microsoft-com:office:office' 
          xmlns:w='urn:schemas-microsoft-com:office:word' 
          xmlns='http://www.w3.org/TR/REC-html40'>
    <head>
      <meta charset='utf-8'>
      <title>${title}</title>
      <style>
        @page WordSection1 {
          size: 595.3pt 841.9pt; /* A4 size */
          margin: 72.0pt 72.0pt 72.0pt 72.0pt; /* 1 inch margins */
          mso-header-margin: 35.4pt;
          mso-footer-margin: 35.4pt;
          mso-paper-source: 0;
        }
        div.WordSection1 {
          page: WordSection1;
        }
        body {
          font-family: 'Times New Roman', Times, serif;
          font-size: 11.5pt;
          line-height: 1.45;
          color: #1e293b;
        }
        p {
          margin: 0 0 8pt 0;
          text-align: justify;
        }
      </style>
    </head>
    <body>
      <div class="WordSection1">
        ${htmlBody}
      </div>
    </body>
    </html>
  `;

  const blob = new Blob(["\ufeff" + docEnvelope], {
    type: "application/msword;charset=utf-8",
  });

  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = fileName;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}
