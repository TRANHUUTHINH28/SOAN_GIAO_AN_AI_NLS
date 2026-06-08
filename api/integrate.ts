import type { VercelRequest, VercelResponse } from "@vercel/node";
import { GoogleGenAI } from "@google/genai";

const SYSTEM_INSTRUCTION = `Bạn là chuyên gia phân tích giáo án Vật lí THPT, chuyên gia tích hợp năng lực số và giáo dục trí tuệ nhân tạo (AI) trong dạy học môn Vật lí 10, 11, 12 tại Việt Nam theo chương trình GDPT 2018.

Nhiệm vụ của bạn là đọc toàn bộ giáo án Vật lí cũ của giáo viên cung cấp, chuẩn hóa theo mẫu Công văn 5512 (nếu chưa chuẩn hóa) và chèn trực tiếp nội dung tích hợp kỹ năng số (năng lực số) và trí tuệ nhân tạo (AI) vào các vị trí phù hợp trong từng hoạt động học (Khởi động, Hình thành kiến thức, Luyện tập, Vận dụng).

BẠN CẦN TUÂN THỦ NGHIÊM NGẶT CÁC CƠ SỞ SAU:
1. Khung năng lực số cho người học theo Thông tư 02/2025/TT-BGDĐT. Các miền năng lực gồm:
   - Khai thác dữ liệu và thông tin vật lí. (VD: NLS 1.1, NLS 1.2...) -> Học sinh sử dụng internet, trang web giáo dục, phần mềm mô phỏng để lấy số liệu thực nghiệm.
   - Giao tiếp và hợp tác trong môi trường số. (VD: NLS 2.1, NLS 2.2...) -> Học sinh phối hợp làm slide nhóm trực tuyến, bảng chia sẻ số (Padlet, Google Slides).
   - Sáng tạo nội dung số. (VD: NLS 3.1, NLS 3.2...) -> Thiết kế sơ đồ tư duy số, viết báo cáo thí nghiệm trên bảng tính Word/Excel, thiết kế video thực nghiệm.
   - An toàn số. (VD: NLS 4.1, NLS 4.2...) -> Nhập liệu trung thực, trích dẫn bản quyền phần mềm hỗ trợ và học liệu số.
   - Giải quyết vấn đề số. (VD: NLS 5.1, NLS 5.2...) -> Sử dụng công cụ mô phỏng để giải quyết giả thuyết vật lý, tối ưu hóa thông số.
   - Ứng dụng trí tuệ nhân tạo. (VD: NLS 6.1, NLS 6.2...) -> Sử dụng trợ lý để phân tích phương trình chuyển động, lập luận đạo lực.

2. Khung giáo dục trí tuệ nhân tạo cho học sinh phổ thông theo Quyết định 3439/QĐ-BGDĐT. Các năng lực AI gồm:
   - NLa: Tư duy lấy con người làm trung tâm.
   - NLb: Đạo đức AI & Trách nhiệm số.
   - NLc: Các kĩ thuật và ứng dụng AI.
   - NLd: Thiết kế hệ thống AI đơn giản.

3. Phân chia mức độ theo khối lớp (Vật lí 10, 11, 12 - Chương trình GDPT 2018).

NGUYÊN TẮC BẮT BUỘC (TUÂN THỦ 100%):
- Giữ nguyên nội dung và cấu trúc giáo án gốc.
- Bảo toàn vị trí hình vẽ, sơ đồ, đồ thị.
- Tích hợp đúng thực chất.
- Phải luôn có pha đối chứng, kiểm tra kết quả từ AI.
- Không tạo các liên kết tải file Word (.docx) giả mạo.

CÁCH THỨC CHÈN NỘI DUNG TÍCH HỢP VÀO CÁC HOẠT ĐỘNG:
Tại các vị trí phù hợp trong từng hoạt động của giáo án, chèn thêm đoạn nội dung sau (phải có ký tự biểu tượng 🔴):

🔴 [Tích hợp NLS & AI]
- NLS: (NLS x.x – tên năng lực thành phần – Bậc ...)
- AI: (NLa/NLb/NLc/NLd – mô tả cụ thể, nếu có)
- Biểu hiện: [Nêu rõ học sinh làm gì, thao tác thiết bị/bộ thí nghiệm ảo/cảm biến/phần mềm nào]

🔴 [Giáo viên hướng dẫn]
- Giáo viên giao nhiệm vụ cụ thể sử dụng thiết bị số.
- Hướng dẫn học sinh sử dụng ứng dụng hoặc cấu trúc prompt tính toán vật lý học phù hợp.
- Giáo viên nhắc nhở học sinh KHÔNG chia sẻ dữ liệu riêng tư cá nhân khi dùng hệ thống AI trực tuyến.
- Yêu cầu học sinh sử dụng tài liệu Vật lí chính thống để đối soát các phản hồi từ AI.

🔴 [Học sinh thực hiện]
- Học sinh thực hiện từng bước.
- Nhóm thảo luận, so sánh, đối chứng.
- Ghi rõ phần tự làm, phần thực tế đo đạc, và phần được hỗ trợ bởi công nghệ số/AI.

🔴 [Sản phẩm số hoặc sản phẩm AI]
- Mô tả sản phẩm cụ thể gắn chặt với mục tiêu bài học.

🔴 [Đánh giá]
- Tiêu chí đánh giá hành vi vật lý số trực quan cụ thể.

ĐẦU RA BẠN PHẢI TRẢ VỀ:
# PHẦN 1: BẢNG ĐỊ TRÌNH TÍCH HỢP
Gồm các cột: Hoạt động | Nội dung tích hợp | Mã NLS | Mã AI (nếu có) | Sản phẩm số/AI dự kiến | Lưu ý đạo đức số/AI.

# PHẦN 2: GIÁO ÁN ĐÃ TÍCH HỢP HOÀN CHỈNH (VẬT LÍ THPT 10, 11, 12)
Xuất lại TOÀN BỘ nội dung giáo án cũ của giáo viên nhưng đã được khéo léo chèn vào bên trong các tiến trình dạy học các phần 🔴 tích hợp cực kỳ chi tiết.

# PHẦN 3: HƯỚNG DẪN XUẤT SANG GOOGLE DOCS / MICROSOFT WORD
Hướng dẫn chi tiết từng bước cho giáo viên sao chép và định dạng để tải về file .docx chất lượng tốt nhất.

CHÚ Ý: Tất cả các công thức, biểu thức, kí hiệu toán học hay vật lý bắt buộc phải đặt giữa ký hiệu đô-la $ (ví dụ: $công_thức$). Tuyệt đối không bao giờ dùng các ký hiệu khác như \\[ ... \\] hay \\( ... \\) hay $$ ... $$. Viết tiếng Việt chuẩn 100%.`;

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
    const { lessonPlan, level, subject, customApiKey, fileData } = req.body;

    const hasFile = fileData && fileData.base64 && fileData.mimeType;

    if (!lessonPlan && !hasFile) {
      return res.status(400).json({ error: "Nội dung giáo án hoặc tệp tài liệu đi kèm không được để trống." });
    }

    const selectedApiKey = customApiKey?.trim() || process.env.GEMINI_API_KEY;

    if (!selectedApiKey) {
      return res.status(400).json({
        error: "Chưa cấu hình API Key. Vui lòng nhập API Key trong bảng điều khiển hoặc cấu hình biến môi trường GEMINI_API_KEY.",
      });
    }

    const ai = new GoogleGenAI({ apiKey: selectedApiKey });

    let userPrompt = "";
    let contentsPayload: any = null;

    if (hasFile) {
      userPrompt = `Dưới đây là tệp học liệu/ảnh chụp trang sách giáo khoa môn Vật lí từ học liệu hoặc Sách Giáo Khoa (SGK) Kết nối tri thức được tải lên trực tiếp.
Vì giáo viên chưa có giáo án phác thảo từ trước, hãy đóng vai Tổ trưởng chuyên môn biên soạn MỚI TOÀN BỘ một Kế hoạch bài dạy (Giáo án) hoàn thiện, chỉn chu từ đầu theo quy chuẩn Công văn 5512 của Bộ Giáo dục, có tích hợp linh hoạt Năng lực số và năng lực AI vào tiến trình các hoạt động học của bài.

CẤP HỌC: ${level || "Vật lí 10"}
BÀI HỌC / CHỦ ĐỀ SÁCH GIÁO KHOA: ${subject || "Vật lí học chuyên sâu"}

YÊU CẦU BIÊN SOẠN BẢO ĐẢM 5512:
1. Đầy đủ các phần mục: MỤC TIÊU BÀI HỌC, THIẾT BỊ DẠY HỌC VÀ HỌC LIỆU, TIẾN TRÌNH DẠY HỌC.
2. Tích hợp thực chất các Miền năng lực số (NLS) hoặc các năng lực trí tuệ nhân tạo (NLa/NLb/NLc) được ký hiệu bằng dấu 🔴 ở các hoạt động học.
3. Chú ý ký hiệu LaTeX đặt trong cặp đô la $...$ ví dụ $p = m \\cdot v$, và đặt hộp ký hiệu giữ đúng vị trí: "[HÌNH VẼ: Thầy/Cô cắt hình vẽ, đồ thị từ chương này dán vào đây]".

Hãy trình bày kết quả biên soạn gồm 3 phần chính rõ ràng:
Phần 1: Bảng định trình tích hợp (Hoạt động | Miền tích hợp | Sản phẩm số).
Phần 2: Giáo án tích hợp chuẩn 5512 hoàn chỉnh biên soạn chi tiết từng câu chữ từ kiến thức SGK đính kèm.
Phần 3: Hướng dãn xuất sang Docs/Word.`;

      contentsPayload = {
        parts: [
          { inlineData: { mimeType: fileData.mimeType, data: fileData.base64 } },
          { text: userPrompt },
        ],
      };
    } else {
      userPrompt = `Dưới đây là giáo án cũ của tôi. Hãy phân tích, bổ sung chuẩn hóa 5512 (nếu cần) và đặc biệt là chèn tích hợp Năng lực số và năng lực AI vào các hoạt động dạy học một cách khéo léo theo đúng quy chuẩn đã đặt ra.

CẤP HỌC: ${level || "Vật lí 10"}
BÀI HỌC / MÔN HỌC: ${subject || "Vật lí học"}

NỘI DUNG GIÁO ÁN GỐC CẦN XỬ LÝ:
=========================================
${lessonPlan}
=========================================

Hãy trả về kết quả hoàn chỉnh theo 3 phần: Phần 1 (Bảng định hướng), Phần 2 (Giáo án đã tích hợp chi tiết gắn ký hiệu 🔴), Phần 3 (Hướng dẫn xuất file). Giữ nguyên tối đa câu chữ, bảng biểu, các phần bài học cốt lõi của tôi, chỉ chèn nội dung bổ sung vào các vị trí thực tiễn.`;
      contentsPayload = userPrompt;
    }

    const response = await generateContentWithRetry(ai, {
      model: "gemini-2.5-flash",
      contents: contentsPayload,
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        temperature: 0.35,
      },
    });

    const resultText = response.text;
    if (!resultText) {
      throw new Error("Không nhận được kết quả xử lý từ mô hình AI.");
    }

    return res.json({ output: resultText });
  } catch (error: any) {
    console.error("API Error:", error);
    let friendlyMessage = error.message || "Đã xảy ra lỗi không xác định khi kết nối với máy chủ AI.";

    const errMsgStr = String(error.message || "").toLowerCase();
    if (errMsgStr.includes("503") || errMsgStr.includes("demand") || errMsgStr.includes("unavailable") || errMsgStr.includes("overloaded") || errMsgStr.includes("quota")) {
      friendlyMessage = "⚠️ MÁY CHỦ AI ĐANG QUÁ TẢI TẠM THỜI (Lỗi 503): Do tệp tài liệu PDF/Hình ảnh tải lên có kích thước lớn hoặc số lượt yêu cầu đồng thời từ người dùng tăng đột biến.\n\n👉 GIẢI PHÁP KHẮC PHỤC HIỆU QUẢ:\nThầy/Cô hãy Mở tệp PDF/Hình ảnh, SAO CHÉP (COPY) TRỰC TIẾP ĐOẠN VĂN BẢN nội dung bài học rồi DÁN (PASTE) thẳng vào khung nhập liệu bên trái thay vì tải tệp lớn lên.";
    } else if (errMsgStr.includes("payload too large") || errMsgStr.includes("413")) {
      friendlyMessage = "⚠️ KÍCH THƯỚC TỆP QUÁ TẢI: Tệp PDF hoặc hình ảnh của bạn có dung lượng quá lớn vượt ngưỡng xử lý an toàn của cổng API.\n\n👉 GIẢI PHÁP KHẮC PHỤC:\nThầy/Cô hãy Mở tệp PDF, SAO CHÉP (COPY) ĐOẠN VĂN BẢN nội dung bài cần soạn rồi DÁN TRỰC TIẾP vào ô nhập văn bản giáo án bên trái.";
    }

    return res.status(500).json({ error: friendlyMessage });
  }
}
