import type { VercelRequest, VercelResponse } from "@vercel/node";
import { GoogleGenAI } from "@google/genai";

async function generateContentWithRetry(ai: any, params: any, retries = 3, delayMs = 1500) {
  for (let i = 0; i < retries; i++) {
    try {
      return await ai.models.generateContent(params);
    } catch (error: any) {
      console.warn(`Attempt ${i + 1} to contact Gemini failed:`, error);
      const errMsg = String(error.message || "").toLowerCase();
      const isUnavailable =
        errMsg.includes("503") ||
        errMsg.includes("unavailable") ||
        errMsg.includes("demand") ||
        errMsg.includes("temporary") ||
        errMsg.includes("overloaded") ||
        errMsg.includes("rate limit") ||
        errMsg.includes("quota");
      if (isUnavailable && i < retries - 1) {
        await new Promise((resolve) => setTimeout(resolve, delayMs));
        delayMs *= 2.5;
        continue;
      }
      throw error;
    }
  }
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { rawText, customApiKey } = req.body;
    if (!rawText || !rawText.trim()) {
      return res.status(400).json({ error: "Nội dung văn bản trống. Vui lòng dán hoặc tải lên nội dung hợp lệ." });
    }

    const selectedApiKey = customApiKey?.trim() || process.env.GEMINI_API_KEY;
    if (!selectedApiKey) {
      return res.status(400).json({
        error: "Chưa cấu hình API Key. Vui lòng nhập API Key trong bảng điều khiển hoặc cấu hình biến môi trường GEMINI_API_KEY.",
      });
    }

    const ai = new GoogleGenAI({ apiKey: selectedApiKey });

    const systemInstruction = `Bạn là một trợ lý AI chuyên nghiệp phục vụ cho giáo viên Vật lí THPT Việt Nam. Nhiệm vụ của bạn là đọc và phân tích đoạn văn bản mục lục hoặc danh mục bài học do người dùng cung cấp và biến đổi nó thành một tài liệu cấu trúc JSON chuẩn cho danh sách bài học.
Mỗi bài học cần được chuyển đổi thành một đối tượng trong mảng JSON có cấu trúc chính xác như sau:
\`\`\`json
{
  "lessons": [
    {
      "lessonNumber": 1,
      "title": "Tên đầy đủ của bài học",
      "chapter": "Tên chương chứa bài học này",
      "coreContent": "Tóm tắt súc tích lý thuyết cốt lõi, công thức quan trọng, biểu thức đặc trưng của bài học dưới dạng các gạch đầu dòng ngắn gọn (khoảng 3-5 gạch đầu dòng)."
    }
  ]
}
\`\`\`

Yêu cầu bắt buộc:
1. Trích xuất chính xác tất cả các bài học từ văn bản mục lục mà người dùng cung cấp. Đừng bỏ sót bất cứ bài nào.
2. Với các công thức vật lý, hãy viết dạng ký hiệu tiêu chuẩn toán học LaTeX đặt giữa hai dấu đô la, ví dụ: $p = m \\cdot v$.
3. Trả về đúng dữ liệu định dạng JSON hợp lệ duy nhất khớp với cấu trúc được yêu cầu, KHÔNG chèn thêm bất kỳ lời bình luận hay ký tự Markdown bọc ngoài nào cả, chỉ trả về chuỗi JSON thuần túy.`;

    const userPrompt = `Hãy đọc đoạn văn bản mục lục/giáo trình Vật lí sau đây và chuyển dịch nó sang cấu trúc danh mục bài học JSON:
========================================
${rawText}
========================================`;

    const response = await generateContentWithRetry(ai, {
      model: "gemini-2.5-flash",
      contents: userPrompt,
      config: {
        systemInstruction,
        temperature: 0.1,
        responseMimeType: "application/json",
      },
    });

    const resultText = response.text;
    if (!resultText) {
      throw new Error("Không nhận được kết quả xử lý từ mô hình AI.");
    }

    const parsedJson = JSON.parse(resultText);
    return res.json(parsedJson);
  } catch (error: any) {
    console.error("Parse Curriculum Error:", error);
    return res.status(500).json({
      error: "Không thể phân tách văn bản bằng AI. Vui lòng đảm bảo định dạng văn bản đúng hoặc thử phương án chỉnh sửa danh sách bằng tay. Chi tiết lỗi: " + (error.message || ""),
    });
  }
}
