import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = 3000;

// Set up JSON body parser with increased limit for large lesson plans
app.use(express.json({ limit: "15mb" }));

// System instructions in Vietnamese containing Vietnamese Ministry guidelines for high-school Physics
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
   - NLa: Tư duy lấy con người làm trung tâm (Nhận định giới hạn của AI, hiểu bản chất định luật vật lí là do con người chứng minh và xác nhận, AI chỉ là công cụ tính toán).
   - NLb: Đạo đức AI & Trách nhiệm số (Trích dẫn rõ ràng khi sử dụng AI để giải phương trình nâng cao, không giả mạo kết quả thí nghiệm bằng AI, bảo vệ thông tin nghiên cứu cá nhân).
   - NLc: Các kĩ thuật và ứng dụng AI (Tạo câu lệnh prompt cụ thể bao gồm phân vai, ngữ cảnh, nguồn lực để nhờ chatbot AI viết thuật giải mô phỏng, lập chương trình tính toán số).
   - NLd: Thiết kế hệ thống AI đơn giản (Học sinh đề xuất hoặc phản biện cấu trúc thuật toán giải nội dòng các biến chuyển động).

3. Phân chia mức độ theo khối lớp (Vật lí 10, 11, 12 - Chương trình GDPT 2018):
   - Vật lí 10: Chuyên đề Cơ học (Động học, Động lực học, Năng lượng, Động lượng...). Thường tích hợp phần mềm mô phỏng tương tác lực và va chạm mềm/đàn hồi (PhET, Algodoo), ứng dụng camera phân tích chuyển động (Tracker).
   - Vật lí 11: Chuyên đề Dao động, Sóng (Cơ, Điện từ), Điện trường, Từ trường, Dòng điện... Tích hợp mô phỏng vẽ đường sức từ/điện trường PhET, cảm biến điện thoại (Phyphox) thu nhận tần số âm thanh/chu kỳ dao động con lắc.
   - Vật lí 12: Chuyên đề Nhiệt học (Thuyết động học phân tử khí, chất khí lí tưởng), Vật lý hạt nhân, Vi mô, Bán dẫn... Tích hợp mô phỏng va chạm động học khí PhET, Excel/Google Sheets phân tích biểu đồ thống kê tương quan áp suất - thể tích - nhiệt độ.

NGUYÊN TẮC BẮT BUỘC (TUÂN THỦ 100%):
- Giữ nguyên nội dung và cấu trúc giáo án gốc: Không rút gọn, không tóm tắt, không viết lại toàn bộ giáo án theo cấu trúc khác hoàn toàn, không làm thay đổi hay lược bỏ nội dung dạy học cốt lõi, không đảo lộn thứ tự các hoạt động của bài học, không làm mất bảng biểu. Chỉ thực hiện chèn thêm nội dung tích hợp vào vị trí phù hợp nhất trong tiến trình.
- Bảo toàn vị trí hình vẽ, sơ đồ, đồ thị: Khi thấy có chú thích hình vẽ (Ví dụ: "Hình 1", "Hình vẽ...", "Sơ đồ...", "Đồ thị...") hoặc nơi có hình minh họa trong giáo án gốc, TUYỆT ĐỐI không được lược bỏ hay xóa đi. Hãy giữ nguyên tên chú thích hình vẽ gốc và luôn chèn ký hiệu hộp gợi ý rõ ràng: "[HÌNH VẼ: Thầy/Cô cắt hình từ bản gốc dán vào đây]" đúng vị trí địa lý của nó để giáo viên thuận tiện ghép ảnh trở lại sau khi tải Word.
- Tích hợp đúng thực chất: Không tích hợp hời hợt, hình thức. Mỗi phần tích hợp phải có hành vi, thao tác cụ thể của học sinh lên thiết bị di động, cảm biến, phần mềm thí nghiệm ảo hoặc câu lệnh AI. Nếu bài học hay hoạt động nào tuyệt đối không cần thiết phải dùng AI thì chỉ tích hợp năng lực số (NLS) thông thường, tránh gượng ép.
- Phải luôn có pha đối chứng, kiểm tra kết quả từ AI: Yêu cầu học sinh đối chiếu kết quả tính toán động lực học hay đồ thị mà AI đề xuất với sách giáo khoa chính khóa của ban Khoa học Tự nhiên hoặc tài liệu được giáo viên thẩm định để tránh lệ thuộc mù quáng.
- Không tạo các liên kết tải file Word (.docx) giả mạo hoặc thông báo đã tạo được file Word. Chỉ xuất nội dung văn bản markdown sạch, đẹp đẽ để người dùng dễ dàng trực tiếp sao chép sang Google Docs hoặc Microsoft Word.

CÁCH THỨC CHÈN NỘI DUNG TÍCH HỢP VÀO CÁC HOẠT ĐỘNG:
Tại các vị trí phù hợp trong từng hoạt động của giáo án, chèn thêm đoạn nội dung sau (phải có ký tự biểu tượng 🔴):

🔴 [Tích hợp NLS & AI]
- NLS: (NLS x.x – tên năng lực thành phần – Bậc ...)
- AI: (NLa/NLb/NLc/NLd – mô tả cụ thể, nếu có)
- Biểu hiện: [Nêu rõ học sinh làm gì, thao tác thiết bị/bộ thí nghiệm ảo/cảm biến/phần mềm nào, xử lý số liệu gì, chạy câu lệnh prompt nào, kiểm tra/đối chứng kết quả với SGK thế nào, hợp tác nhóm ra sao]

🔴 [Giáo viên hướng dẫn]
- Giáo viên giao nhiệm vụ cụ thể sử dụng thiết bị số (máy tính, điện thoại, cảm biến...) hoặc chạy AI.
- Hướng dẫn học sinh sử dụng ứng dụng hoặc cấu trúc prompt tính toán vật lý học phù hợp.
- Giáo viên nhắc nhở học sinh KHÔNG chia sẻ dữ liệu riêng tư cá nhân khi dùng hệ thống AI trực tuyến.
- Yêu cầu học sinh sử dụng tài liệu Vật lí chính thống để đối soát các phản hồi từ AI.
- Nhận xét và điều chỉnh các lỗi sai lệch vật lí hoặc hiểu lầm mô phỏng của học sinh.

🔴 [Học sinh thực hiện]
- Học sinh thực hiện từng bước (bơm hạt khí trong PhET, chạy app Phyphox, lập bảng số liệu Excel, viết prompt nhờ AI giải thích hiện tượng quang điện...).
- Nhóm thảo luận, so sánh, đối chứng độ chính xác của AI hay mô hình ảo với lý thuyết vật lí chính thống.
- Hoàn thiện các sản phẩm vật lý học số hóa cá nhân hoặc nhóm.
- Ghi rõ phần tự làm, phần thực tế đo đạc, và phần được hỗ trợ bởi công nghệ số/AI.

🔴 [Sản phẩm số hoặc sản phẩm AI]
- Mô tả sản phẩm cụ thể gắn chặt với mục tiêu bài học (Ví dụ: file số liệu va chạm bốc từ cổng quang, ảnh chụp màn hình điện phổ PhET, bảng so sánh áp suất lý thuyết và mô phỏng, bảng phân tích câu prompt tối ưu giải bài tập điện từ...).

🔴 [Đánh giá]
- Tiêu chí đánh giá hành vi vật lý số trực quan cụ thể (VD: nhóm học sinh đạt NLS 1.2 bậc 3 khi biết phân tích sai lệch số liệu thực nghiệm gốc và mô phỏng ảo; đạt NLb khi biết ghi chú rõ nguồn công cụ AI giúp tính tích phân tính công lực điện...).

ĐẦU RA BẠN PHẢI TRẢ VỀ:
Hãy định dạng kết quả rõ ràng theo cấu trúc 3 phần sau:

# PHẦN 1: BẢNG ĐỊ TRÌNH TÍCH HỢP (Dùng cấu trúc biểu đồ markdown bảng rõ ràng)
Gồm các cột: Hoạt động | Nội dung tích hợp | Mã NLS | Mã AI (nếu có) | Sản phẩm số/AI dự kiến | Lưu ý đạo đức số/AI.

# PHẦN 2: GIÁO ÁN ĐÃ TÍCH HỢP HOÀN CHỈNH (VẬT LÍ THPT 10, 11, 12)
Xuất lại TOÀN BỘ nội dung giáo án cũ của giáo viên nhưng đã được khéo léo chèn vào bên trong các tiến trình dạy học các phần 🔴 tích hợp cực kỳ chi tiết, sinh động và có chiều sâu sư phạm Vật lí.

# PHẦN 3: HƯỚNG DẪN XUẤT SANG GOOGLE DOCS / MICROSOFT WORD
Hướng dẫn chi tiết từng bước cho giáo viên sao chép và định dạng để tải về file .docx chất lượng tốt nhất.

CHÚ Ý: Tất cả các công thức, biểu thức, kí hiệu toán học hay vật lý (ví dụ: $p = m \cdot v$, $v_0$, $\Delta t$, $s = v \cdot t$, $10\text{ m/s}$) bắt buộc phải đặt giữa ký hiệu đô-la $ (ví dụ: $công_thức$) để người dùng có thể sử dụng chức năng Toggle TeX chuyển sang MathType trong Word tự động. Tuyệt đối không bao giờ dùng các ký hiệu khác như \\[ ... \\] hay \\( ... \\) hay $$ ... $$. Viết tiếng Việt chuẩn 100%, không viết tắt vô nghĩa, biên soạn chỉn chu, tiêu đề rõ ràng.`;

// Helper function to call generateContent with automatic retry on 503 Unavailable / high demand errors
async function generateContentWithRetry(ai: any, params: any, retries = 3, delayMs = 1500) {
  for (let i = 0; i < retries; i++) {
    try {
      return await ai.models.generateContent(params);
    } catch (error: any) {
      console.warn(`Attempt ${i + 1} to contact Gemini failed:`, error);
      const errMsg = String(error.message || "").toLowerCase();
      const isUnavailable = errMsg.includes("503") ||
                            errMsg.includes("unavailable") ||
                            errMsg.includes("demand") ||
                            errMsg.includes("temporary") ||
                            errMsg.includes("overloaded") ||
                            errMsg.includes("rate limit") ||
                            errMsg.includes("quota");
      if (isUnavailable && i < retries - 1) {
        console.log(`Gemini API busy (503). Retrying in ${delayMs}ms (retry ${i + 1}/${retries})...`);
        await new Promise((resolve) => setTimeout(resolve, delayMs));
        delayMs *= 2.5; // Exponential backoff
        continue;
      }
      throw error;
    }
  }
}

// Route for automatically parsing textbooks or table of contents into structured curriculum dropdown data
app.post("/api/parse-curriculum", async (req, res) => {
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

    const ai = new GoogleGenAI({
      apiKey: selectedApiKey,
      httpOptions: {
        headers: {
          "User-Agent": "aistudio-build",
        },
      },
    });

    const systemInstruction = `Bạn là một trợ lý AI chuyên nghiệp phục vụ cho giáo viên Vật lí THPT Việt Nam. Nhiệm vụ của bạn là đọc và phân tích đoạn văn bản mục lục hoặc danh mục bài học do người dùng cung cấp và biến đổi nó thành một tài liệu cấu trúc JSON chuẩn cho danh sách bài học.
Mỗi bài học cần được chuyển đổi thành một đối tượng trong mảng JSON có cấu trúc chính xác như sau:
\`\`\`json
{
  "lessons": [
    {
      "lessonNumber": 1, // Số thứ tự bài học, là kiểu số nguyên dương tăng dần bắt đầu từ 1.
      "title": "Tên đầy đủ của bài học", // Ví dụ: "Bài 1: Cấu trúc của chất. Sự chuyển thể" hoặc "Bài 1. Làm quen với Vật lí"
      "chapter": "Tên chương chứa bài học này", // Ví dụ: "Chương I: Vật lí nhiệt" hoặc "Chương 1: Động học"
      "coreContent": "Tóm tắt súc tích lý thuyết cốt lõi, công thức quan trọng, biểu thức đặc trưng của bài học dưới dạng các gạch đầu dòng ngắn gọn (khoảng 3-5 gạch đầu dòng), đảm bảo chứa đầy đủ các đại lượng vật lý đặc thù của bài."
    }
  ]
}
\`\`\`

Yêu cầu bắt buộc:
1. Trích xuất chính xác tất cả các bài học (Bài 1, Bài 2, Bài 3...) từ văn bản mục lục mà người dùng cung cấp. Đừng bỏ sót bất cứ bài nào.
2. Với các công thức vật lý, hãy viết dạng ký hiệu tiêu chuẩn toán học LaTeX đặt giữa hai dấu đô la, ví dụ: $p = m \\cdot v$ hoặc $E_d = \\frac{1}{2} m v^2$.
3. Trả về đúng dữ liệu định dạng JSON hợp lệ duy nhất khớp với cấu trúc được yêu cầu, KHÔNG chèn thêm bất kỳ lời bình luận hay ký tự Markdown bọc ngoài nào cả, chỉ trả về chuỗi JSON thuần túy dán được trực tiếp vào JSON.parse().`;

    const userPrompt = `Hãy đọc đoạn văn bản mục lục/giáo trình Vật lí sau đây và chuyển dịch nó sang cấu trúc danh mục bài học JSON:
========================================
${rawText}
========================================`;

    const response = await generateContentWithRetry(ai, {
      model: "gemini-3.5-flash",
      contents: userPrompt,
      config: {
        systemInstruction,
        temperature: 0.1,
        responseMimeType: "application/json"
      },
    });

    const resultText = response.text;
    if (!resultText) {
      throw new Error("Không nhận được kết quả xử lý từ mô hình AI.");
    }

    const parsedJson = JSON.parse(resultText);
    res.json(parsedJson);

  } catch (error: any) {
    console.error("Parse Curriculum Error:", error);
    res.status(500).json({
      error: "Không thể phân tách văn bản bằng AI. Vui lòng đảm bảo định dạng văn bản đúng hoặc thử phương án chỉnh sửa danh sách bằng tay. Chi tiết lỗi: " + (error.message || "")
    });
  }
});

// Route for integrating lesson plans
app.post("/api/integrate", async (req, res) => {
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

    // Initialize GoogleGenAI client with target API key
    const ai = new GoogleGenAI({
      apiKey: selectedApiKey,
      httpOptions: {
        headers: {
          "User-Agent": "aistudio-build",
        },
      },
    });

    let systemInstruction = SYSTEM_INSTRUCTION;
    let userPrompt = "";
    let contentsPayload: any = null;

    if (hasFile) {
      // Multimodal mode: Compose new lesson plan from textbook chapter
      userPrompt = `Dưới đây là tệp học liệu/ảnh chụp trang sách giáo khoa môn Vật lí từ học liệu hoặc Sách Giáo Khoa (SGK) Kết nối tri thức được tải lên trực tiếp.
Vì giáo viên chưa có giáo án phác thảo từ trước, hãy đóng vai Tổ trưởng chuyên môn biên soạn MỚI TOÀN BỘ một Kế hoạch bài dạy (Giáo án) hoàn thiện, chỉn chu từ đầu theo quy chuẩn Công văn 5512 của Bộ Giáo dục, có tích hợp linh hoạt Năng lực số và năng lực AI vào tiến trình các hoạt động học của bài.

CẤP HỌC: ${level || "Vật lí 10"}
BÀI HỌC / CHỦ ĐỀ SÁCH GIÁO KHOA: ${subject || "Vật lí học chuyên sâu"}

YÊU CẦU BIÊN SOẠN BẢO ĐẢM 5512:
1. Đầy đủ các phần mục:
   I. MỤC TIÊU BÀI HỌC (Năng lực Vật lí, Năng lực chung, Phẩm chất, đặc sắc là Năng lực số / AI).
   II. THIẾT BỊ DẠY HỌC VÀ HỌC LIỆU (Thiết bị thông minh, cảm biến, thí nghiệm mô phỏng, phần mềm AI hỗ trợ).
   III. TIẾN TRÌNH DẠY HỌC: Các hoạt động học (Khởi động, Hình thành kiến thức, Luyện tập, Vận dụng) xây dựng sinh động.
2. Tích hợp thực chất các Miền năng lực số (NLS) hoặc các năng lực trí tuệ nhân tạo (NLa/NLb/NLc) được ký hiệu bằng dấu 🔴 ở các hoạt động học. Ghi rõ thao tác hoạt động của học sinh (phần mềm PhET, Phyphox, excel, prompt...) và giai đoạn phản biện đối chứng với SGK để tránh thụ động.
3. Chú ý ký hiệu LaTeX đặt trong cặp đô la $...$ ví dụ $p = m \\cdot v$, và đặt hộp ký hiệu giữ đúng vị trí cơ lý hiển thị hình ảnh mẫu: "[HÌNH VẼ: Thầy/Cô cắt hình vẽ, đồ thị từ chương này dán vào đây]".

Hãy trình bày kết quả biên soạn gồm 3 phần chính rõ ràng:
Phần 1: Bảng định trình tích hợp (Hoạt động | Miền tích hợp | Sản phẩm số).
Phần 2: Giáo án tích hợp chuẩn 5512 hoàn chỉnh biên soạn chi tiết từng câu chữ từ kiến thức SGK đính kèm.
Phần 3: Hướng dãn xuất sang Docs/Word.`;

      const filePart = {
        inlineData: {
          mimeType: fileData.mimeType,
          data: fileData.base64,
        },
      };

      const textPart = {
        text: userPrompt,
      };

      contentsPayload = {
        parts: [filePart, textPart],
      };
    } else {
      // Text enrichment mode
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

    // Make API call to Gemini model with robust retry protocol
    const response = await generateContentWithRetry(ai, {
      model: "gemini-3.5-flash",
      contents: contentsPayload,
      config: {
        systemInstruction,
        temperature: 0.35,
      },
    });

    const resultText = response.text;
    if (!resultText) {
      throw new Error("Không nhận được kết quả xử lý từ mô hình AI.");
    }

    res.json({ output: resultText });
  } catch (error: any) {
    console.error("API Error:", error);
    let friendlyMessage = error.message || "Đã xảy ra lỗi không xác định khi kết nối với máy chủ AI.";
    
    // Check if error is related to 503 high demand or file size limits
    const errMsgStr = String(error.message || "").toLowerCase();
    if (errMsgStr.includes("503") || errMsgStr.includes("demand") || errMsgStr.includes("unavailable") || errMsgStr.includes("overloaded") || errMsgStr.includes("quota")) {
      friendlyMessage = "⚠️ MÁY CHỦ AI ĐANG QUÁ TẢI TẠM THỜI (Lỗi 503): Do tệp tài liệu PDF/Hình ảnh tải lên có kích thước lớn hoặc số lượt yêu cầu đồng thời từ người dùng tăng đột biến.\n\n👉 GIẢI PHÁP KHẮC PHỤC HIỆU QUẢ:\nThầy/Cô hãy Mở tệp PDF/Hình ảnh, SAO CHÉP (COPY) TRỰC TIẾP ĐOẠN VĂN BẢN nội dung bài học rồi DÁN (PASTE) thẳng vào khung nhập liệu bên trái thay vì tải tệp lớn lên. Cách này giúp giảm tải hơn 10 lần, AI phản hồi ngay lập tức và tránh hoàn toàn lỗi quá tải!";
    } else if (errMsgStr.includes("payload too large") || errMsgStr.includes("large") || errMsgStr.includes("413") || errMsgStr.includes("limit")) {
      friendlyMessage = "⚠️ KÍCH THƯỚC TỆP QUÁ TẢI: Tệp PDF hoặc hình ảnh của bạn có dung lượng quá lớn vượt ngưỡng xử lý an toàn của cổng API.\n\n👉 GIẢI PHÁP KHẮC PHỤC:\nThầy/Cô hãy Mở tệp PDF, SAO CHÉP (COPY) ĐOẠN VĂN BẢN nội dung bài cần soạn rồi DÁN TRỰC TIẾP vào ô nhập văn bản giáo án bên trái. Cách này luôn hoạt động hoàn hảo và cực kỳ nhanh chóng!";
    }

    res.status(500).json({
      error: friendlyMessage,
    });
  }
});

// Configure Vite or Static Asset delivery
if (process.env.NODE_ENV !== "production") {
  const viteObj = await createViteServer({
    server: { middlewareMode: true },
    appType: "spa",
  });
  app.use(viteObj.middlewares);
} else {
  const distPath = path.join(process.cwd(), "dist");
  app.use(express.static(distPath));
  app.get("*", (req, res) => {
    res.sendFile(path.join(distPath, "index.html"));
  });
}

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server is running at http://0.0.0.0:${PORT}`);
});
