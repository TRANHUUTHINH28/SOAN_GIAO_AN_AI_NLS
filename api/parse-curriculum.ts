import { GoogleGenAI } from "@google/genai";

async function generateContentWithRetry(ai: any, params: any, retries = 3, delayMs = 1500): Promise<any> {
  for (let i = 0; i < retries; i++) {
    try {
      return await ai.models.generateContent(params);
    } catch (error: any) {
      const errMsg = String(error.message || "").toLowerCase();
      const isRetryable =
        errMsg.includes("503") || errMsg.includes("unavailable") ||
        errMsg.includes("overloaded") || errMsg.includes("rate limit");
      if (isRetryable && i < retries - 1) {
        await new Promise((r) => setTimeout(r, delayMs));
        delayMs *= 2.5;
        continue;
      }
      throw error;
    }
  }
}

export default async function handler(req: any, res: any) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") return res.status(200).end();
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });

  try {
    const { rawText, customApiKey } = req.body;
    if (!rawText || !rawText.trim()) {
      return res.status(400).json({ error: "Nội dung văn bản trống. Vui lòng dán hoặc tải lên nội dung hợp lệ." });
    }

    const selectedApiKey = customApiKey?.trim() || process.env.GEMINI_API_KEY;
    if (!selectedApiKey) {
      return res.status(400).json({
        error: "Chưa cấu hình API Key. Vui lòng nhập API Key hoặc cấu hình biến môi trường GEMINI_API_KEY.",
      });
    }

    const ai = new GoogleGenAI({ apiKey: selectedApiKey });

    const systemInstruction = `Bạn là một trợ lý AI chuyên nghiệp phục vụ cho giáo viên Vật lí THPT Việt Nam. Nhiệm vụ của bạn là đọc và phân tích đoạn văn bản mục lục hoặc danh mục bài học do người dùng cung cấp và biến đổi nó thành một tài liệu cấu trúc JSON chuẩn cho danh sách bài học.
Mỗi bài học cần được chuyển đổi thành một đối tượng trong mảng JSON có cấu trúc chính xác như sau:
{"lessons":[{"lessonNumber":1,"title":"Tên đầy đủ của bài học","chapter":"Tên chương","coreContent":"Tóm tắt 3-5 gạch đầu dòng"}]}

Yêu cầu bắt buộc:
1. Trích xuất chính xác tất cả các bài học, không bỏ sót bài nào.
2. Công thức vật lý dùng LaTeX đặt giữa hai dấu đô la: $p = m \\cdot v$.
3. Trả về JSON thuần túy, KHÔNG có markdown, KHÔNG có backtick, chỉ JSON có thể parse trực tiếp.`;

    const userPrompt = `Hãy đọc đoạn văn bản mục lục/giáo trình Vật lí sau đây và chuyển dịch nó sang cấu trúc danh mục bài học JSON:
========================================
${rawText}
========================================`;

    const response = await generateContentWithRetry(ai, {
      model: "gemini-2.0-flash",
      contents: userPrompt,
      config: { systemInstruction, temperature: 0.1, responseMimeType: "application/json" },
    });

    const resultText = response.text;
    if (!resultText) throw new Error("Không nhận được kết quả xử lý từ mô hình AI.");

    const parsedJson = JSON.parse(resultText);
    return res.json(parsedJson);
  } catch (error: any) {
    console.error("Parse Curriculum Error:", error);
    const errMsg = String(error.message || "").toLowerCase();
    let friendlyMessage = "Không thể phân tách văn bản. Chi tiết: " + (error.message || "");

    if (errMsg.includes("429") || errMsg.includes("quota")) {
      friendlyMessage = "⚠️ API KEY ĐÃ HẾT QUOTA (Lỗi 429). Vui lòng tạo API key mới tại aistudio.google.com.";
    }

    return res.status(500).json({ error: friendlyMessage });
  }
}
