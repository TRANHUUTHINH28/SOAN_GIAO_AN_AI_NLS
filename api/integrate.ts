import { GoogleGenAI } from "@google/genai";

const SYSTEM_INSTRUCTION = `Bạn là chuyên gia phân tích giáo án Vật lí THPT, chuyên gia tích hợp năng lực số và giáo dục trí tuệ nhân tạo (AI) trong dạy học môn Vật lí 10, 11, 12 tại Việt Nam theo chương trình GDPT 2018.

Nhiệm vụ của bạn là đọc toàn bộ giáo án Vật lí cũ của giáo viên cung cấp, chuẩn hóa theo mẫu Công văn 5512 (nếu chưa chuẩn hóa) và chèn trực tiếp nội dung tích hợp kỹ năng số (năng lực số) và trí tuệ nhân tạo (AI) vào các vị trí phù hợp trong từng hoạt động học (Khởi động, Hình thành kiến thức, Luyện tập, Vận dụng).

BẠN CẦN TUÂN THỦ NGHIÊM NGẶT CÁC CƠ SỞ SAU:
1. Khung năng lực số cho người học theo Thông tư 02/2025/TT-BGDĐT.
2. Khung giáo dục trí tuệ nhân tạo cho học sinh phổ thông theo Quyết định 3439/QĐ-BGDĐT.
3. Phân chia mức độ theo khối lớp (Vật lí 10, 11, 12 - Chương trình GDPT 2018).

NGUYÊN TẮC BẮT BUỘC (TUÂN THỦ 100%):
- Giữ nguyên nội dung và cấu trúc giáo án gốc.
- Bảo toàn vị trí hình vẽ, sơ đồ, đồ thị.
- Tích hợp đúng thực chất.
- Phải luôn có pha đối chứng, kiểm tra kết quả từ AI.
- Không tạo các liên kết tải file Word (.docx) giả mạo.

CÁCH THỨC CHÈN NỘI DUNG TÍCH HỢP:
🔴 [Tích hợp NLS & AI]
🔴 [Giáo viên hướng dẫn]
🔴 [Học sinh thực hiện]
🔴 [Sản phẩm số hoặc sản phẩm AI]
🔴 [Đánh giá]

ĐẦU RA:
# PHẦN 1: BẢNG ĐỊ TRÌNH TÍCH HỢP
# PHẦN 2: GIÁO ÁN ĐÃ TÍCH HỢP HOÀN CHỈNH
# PHẦN 3: HƯỚNG DẪN XUẤT SANG GOOGLE DOCS / MICROSOFT WORD

CHÚ Ý: Công thức toán học dùng $...$ . Viết tiếng Việt chuẩn 100%.`;

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
    const { lessonPlan, level, subject, customApiKey, fileData } = req.body;
    const hasFile = fileData && fileData.base64 && fileData.mimeType;

    if (!lessonPlan && !hasFile) {
      return res.status(400).json({ error: "Nội dung giáo án hoặc tệp tài liệu đi kèm không được để trống." });
    }

    const selectedApiKey = customApiKey?.trim() || process.env.GEMINI_API_KEY;
    if (!selectedApiKey) {
      return res.status(400).json({
        error: "Chưa cấu hình API Key. Vui lòng nhập API Key hoặc cấu hình biến môi trường GEMINI_API_KEY.",
      });
    }

    const ai = new GoogleGenAI({ apiKey: selectedApiKey });

    let contentsPayload: any;
    let userPrompt: string;

    if (hasFile) {
      userPrompt = `Dưới đây là tệp học liệu/ảnh chụp trang sách giáo khoa môn Vật lí. Hãy biên soạn MỚI TOÀN BỘ một Kế hoạch bài dạy hoàn thiện theo quy chuẩn Công văn 5512, tích hợp Năng lực số và AI.

CẤP HỌC: ${level || "Vật lí 10"}
BÀI HỌC: ${subject || "Vật lí học chuyên sâu"}

Trình bày 3 phần: Phần 1 (Bảng định trình), Phần 2 (Giáo án đầy đủ), Phần 3 (Hướng dẫn xuất Word).`;
      contentsPayload = {
        parts: [
          { inlineData: { mimeType: fileData.mimeType, data: fileData.base64 } },
          { text: userPrompt },
        ],
      };
    } else {
      userPrompt = `Dưới đây là giáo án cũ của tôi. Hãy chuẩn hóa 5512 và chèn tích hợp Năng lực số và AI vào các hoạt động dạy học.

CẤP HỌC: ${level || "Vật lí 10"}
BÀI HỌC: ${subject || "Vật lí học"}

NỘI DUNG GIÁO ÁN GỐC:
=========================================
${lessonPlan}
=========================================

Trả về 3 phần: Phần 1 (Bảng định hướng), Phần 2 (Giáo án tích hợp 🔴), Phần 3 (Hướng dẫn xuất file).`;
      contentsPayload = userPrompt;
    }

    const response = await generateContentWithRetry(ai, {
      model: "gemini-2.0-flash",
      contents: contentsPayload,
      config: { systemInstruction: SYSTEM_INSTRUCTION, temperature: 0.35 },
    });

    const resultText = response.text;
    if (!resultText) throw new Error("Không nhận được kết quả xử lý từ mô hình AI.");

    return res.json({ output: resultText });
  } catch (error: any) {
    console.error("API Error:", error);
    const errMsg = String(error.message || "").toLowerCase();
    let friendlyMessage = error.message || "Đã xảy ra lỗi không xác định.";

    if (errMsg.includes("503") || errMsg.includes("overloaded") || errMsg.includes("unavailable")) {
      friendlyMessage = "⚠️ MÁY CHỦ AI ĐANG QUÁ TẢI (Lỗi 503). Vui lòng thử lại sau 1-2 phút.";
    } else if (errMsg.includes("429") || errMsg.includes("quota") || errMsg.includes("rate")) {
      friendlyMessage = "⚠️ API KEY ĐÃ HẾT QUOTA (Lỗi 429). Vui lòng tạo API key mới tại aistudio.google.com hoặc chờ 1 tiếng để quota reset.";
    } else if (errMsg.includes("api key") || errMsg.includes("invalid") || errMsg.includes("401")) {
      friendlyMessage = "⚠️ API KEY KHÔNG HỢP LỆ. Vui lòng kiểm tra lại API key.";
    }

    return res.status(500).json({ error: friendlyMessage });
  }
}
