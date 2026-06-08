export interface SampleLesson {
  id: string;
  title: string;
  subject: string;
  level: "Vật lí 10" | "Vật lí 11" | "Vật lí 12";
  content: string;
}

export const SAMPLE_LESSONS: SampleLesson[] = [
  {
    id: "vl10-dongluong",
    title: "Vật lí 10 (GDPT 2018): Động lượng và Định luật bảo toàn động lượng",
    subject: "Vật lí 10",
    level: "Vật lí 10",
    content: `GIÁO ÁN VẬT LÍ 10 - CHƯƠNG TRÌNH GDPT 2018
BÀI: ĐỘNG LƯỢNG VÀ ĐỊNH LUẬT BẢO TOÀN ĐỘNG LƯỢNG (Tiết 1)

I. Mục tiêu:
1. Kiến thức:
- Định nghĩa được động lượng, nêu được ý nghĩa và đơn vị của động lượng.
- Phát biểu và viết được công thức định luật bảo toàn động lượng cho hệ kín.
- Hiểu được nguyên tắc chuyển động bằng phản lực.

2. Năng lực vật lí:
- Năng lực nhận thức vật lí: Định nghĩa được đại lượng vectơ động lượng: p = m.v.
- Năng lực tìm hiểu tự nhiên thông qua khảo sát thực nghiệm: Mô tả được chuyển động va chạm của xe trong phòng thí nghiệm.

3. Phẩm chất:
- Chăm chỉ nghiên cứu tài liệu học tập, trung thực trong việc báo cáo số liệu thí nghiệm.

II. Thiết bị dạy học và học liệu:
- Sách giáo khoa Vật lí 10.
- Bộ thí nghiệm kiểm chứng va chạm trên đệm khí hoặc thiết bị cảm biến lực, cảm biến cổng quang điện kết nối máy tính.
- Máy tính học sinh (nếu có).

III. Tiến trình dạy học:

Hoạt động 1: Khởi động và xác định vấn đề học tập (7 phút)
- Giáo viên chiếu video mô tả vụ va chạm giữa hai xe ô tô đồ chơi có khối lượng khác nhau và chuyển động với vận tốc khác nhau.
- Giáo viên đặt câu hỏi gợi mở: Vì sao xe có khối lượng lớn hơn khi đâm vào chướng ngại vật lại gây ra hư hại lớn hơn rất nhiều dù chạy cùng vận tốc? Đại lượng vật lí nào đặc trưng cho xu hướng truyền chuyển động trong va chạm?
- Học sinh suy nghĩ thảo luận nhanh theo cặp và trả lời. Đại lượng này phải tỉ lệ thuận với cả khối lượng m và vận tốc v.
- Giáo viên ghi nhận và dẫn dắt vào bài mới: Động lượng.

Hoạt động 2: Hình thành kiến thức về Động lượng (18 phút)
- Giáo viên hướng dẫn học sinh đọc sách giáo khoa Vật lí 10 mục I để tìm hiểu khái niệm lực tác dụng trong thời gian ngắn, định nghĩa động lượng.
- Học sinh làm việc cá nhân, phát biểu định nghĩa: Động lượng p của một vật có khối lượng m đang chuyển động với vận tốc v là đại lượng đo bằng tích của khối lượng và vận tốc của vật. Công thức: p = m.v.
- Giáo viên giao nhiệm vụ nhóm: Hãy thảo luận và thực hiện giải bài tập tính động lượng của một quả bóng đá khối lượng 450g bay với vận tốc 20m/s và một viên đạn khối lượng 10g bay với vận tốc 600m/s. So sánh động lượng hai vật.
- Học sinh thảo luận viết lời giải lên bảng phụ nhóm.
- Giáo viên nhận xét, chuẩn hóa kiến thức.

Hoạt động 3: Nghiên cứu Định luật bảo toàn động lượng (15 phút)
- Giáo viên giới thiệu khái niệm hệ kín (hệ cô lập). Cho học sinh quan sát thí nghiệm va chạm mềm hoặc va chạm đàn hồi của 2 xe trượt trên đệm khí.
- Học sinh ghi lại các giá trị vận tốc trước và sau va chạm từ bảng số liệu cảm biến cổng quang để tính tổng động lượng của hệ trước và sau va chạm.
- Học sinh nhận xét: Tổng động lượng của hệ trước va chạm xấp xỉ bằng tổng động lượng của hệ sau va chạm.
- Giáo viên chốt định luật bảo toàn động lượng cho hệ kín.

Hoạt động 4: Củng cố và dặn dò (5 phút)
- Giáo viên tóm tắt bài học, giao bài tập về nhà về tính toán va chạm đàn hồi.`
  },
  {
    id: "vl11-dien-truong",
    title: "Vật lí 11 (GDPT 2018): Khái niệm Điện trường và Cường độ điện trường",
    subject: "Vật lí 11",
    level: "Vật lí 11",
    content: `GIÁO ÁN VẬT LÍ LỚP 11 - CHƯƠNG TRÌNH GDPT 2018
BÀI: ĐIỆN TRƯỜNG VÀ CƯỜNG ĐỘ ĐIỆN TRƯỜNG

I. Mục tiêu bài học:
1. Kiến thức:
- Định nghĩa được điện trường là một dạng vật chất đặc trưng xung quanh điện tích.
- Định nghĩa và viết được công thức xác định cường độ điện trường tại một điểm: E = F/q.
- Vẽ được đường sức điện của một số hệ điện tích đơn giản.

2. Năng lực vật lí:
- Năng lực nhận thức vật lí: Nêu được định nghĩa điện trường, đơn vị của cường độ điện trường (V/m).
- Năng lực giải quyết vấn đề bằng mô phỏng: Vẽ phác họa được điện phổ của các điện tích trái dấu và cùng dấu.

3. Phẩm chất:
- Chủ động, tự giác học tập và yêu thích khám phá thế giới vi mô của hạt tích điện.

II. Thiết bị dạy học:
- Máy chiếu, máy tính, tài liệu học tập.
- Phần mềm mô phỏng trường tĩnh điện (ví dụ: PhET Interactive Simulations - Charges and Fields).

III. Tiến trình dạy học:

Hoạt động 1: Khởi động và tạo tình huống (5 phút)
- Giáo viên đặt câu hỏi: Hai điện tích rời xa nhau một khoảng r trong chân không vẫn tác dụng lực Coulomb lên nhau. Bằng cách nào lực Coulomb có thể truyền qua khoảng trống không gian đó được? Có môi trường trung gian nào không?
- Học sinh thảo luận nhóm nhanh. Đưa ra các ý tưởng về lực truyền qua không gian vũ trụ, hay sóng gì đó.
- Giáo viên bổ sung và giới thiệu khái niệm Điện trường.

Hoạt động 2: Hình thành khái niệm Điện trường và Cường độ điện trường (22 phút)
- Giáo viên giảng giải: Điện trường là môi trường truyền tương tác điện.
- Để định lượng độ mạnh yếu của điện trường tại một điểm, ta sử dụng đại lượng Cường độ điện trường E.
- Giáo viên hướng dẫn học sinh quy trình thí nghiệm tư duy: Đặt một điện tích thử nhỏ q khác nhau tại một điểm, đo lực coulomb F, lập tỉ số F/q và nhận xét tỉ số này không phụ thuộc vào q, chỉ phụ thuộc vào bản thân điện trường tại điểm đó. Điều này dẫn tới công thức E = F/q.
- Học sinh ghi nhận công thức và trả lời câu hỏi phụ: Tìm đơn vị của cường độ điện trường từ công thức trên. (N/C hay V/m).
- Giáo viên chốt nội dung và vẽ hình biểu diễn vectơ cường độ điện trường.

Hoạt động 3: Thí nghiệm ảo khảo sát Đường sức điện phổ (15 phút)
- Giáo viên chiếu hoặc giao link mô phỏng PhET (Charges and Fields) lên màn hình.
- Giáo viên yêu cầu học sinh làm việc nhóm thực hiện đặt các điện tích âm, dương lên khung tương tác ảo. Quan sát chiều của các mũi tên biểu thị cường độ điện trường (đậm nhạt biểu thị độ lớn, chiều từ điện tích dương hướng ra xa, điện tích âm hướng vào).
- Học sinh quan sát, vẽ lại sơ đồ đường cảm ứng điện (đường sức điện) của: Một điện tích dương riêng lẻ, một điện tích âm riêng lẻ và một cặp điện tích trái dấu (lưỡng cực điện) vào vở ghi.
- Đại diện nhóm báo cáo sản phẩm đường vẽ. Giáo viên chuẩn hóa kiến thức.

Hoạt động 4: Đánh giá và Vận dụng (3 phút)
- Giáo viên tóm tắt bài học. Phát phiếu bài tập củng cố tính E tại vị trí cách điện tích điểm Q một khoảng r.`
  },
  {
    id: "vl12-thuyet-dong-hoc-khi",
    title: "Vật lí 12 (GDPT 2018): Thuyết động học phân tử chất khí",
    subject: "Vật lí 12",
    level: "Vật lí 12",
    content: `GIÁO ÁN VẬT LÍ LỚP 12 - CHƯƠNG TRÌNH GDPT 2018
BÀI: THUYẾT ĐỘNG HỌC PHÂN TỬ CHẤT KHÍ

I. Mục tiêu bài học:
1. Kiến thức:
- Phát biểu được các nội dung cơ bản của thuyết động học phân tử chất khí.
- Định nghĩa được khí lí tưởng và nêu được sự khác biệt cơ bản giữa khí lí tưởng và khí thực.
- Giải thích được cấu trúc chất khí và áp suất khí dựa trên sự va chạm liên tục của các phân tử lên thành bình.

2. Năng lực vật lí:
- Tự chủ và tự học: Tìm kiếm thông tin và chủ động xử lý để giải thích các tính chất vĩ mô của chất khí bằng mô hình vi mô.
- Tư duy mô hình hóa: Xây dựng hình ảnh động lượng, tốc độ trung bình của các phân tử để sinh ra lực nén ép lên diện tích bề mặt (gây ra áp suất p).

3. Phẩm chất:
- Khách quan, khoa học trong việc phân tích các kiểm chứng lý thuyết và thực nghiệm.

II. Thiết bị dạy học:
- Bộ mô phỏng thí nghiệm tương tác phân tử chất khí (ví dụ PhET - Gas Properties).
- Máy chiếu, máy tính lớp học.

III. Tiến trình dạy học:

Hoạt động 1: Khởi động (5 phút)
- Giáo viên thực hiện ấn píttông của một ống tiêm kín đựng khí khí nén để giảm thể tích. Học sinh thấy càng ấn xuống sâu càng cảm thấy nặng tay.
- Giáo viên đặt câu hỏi: Về mặt vi mô, cái gì đã tạo ra lực đẩy ngược lại piston làm tay ta thấy nặng? Tại sao khi thể tích giảm, sức nén phân tử lại mạnh hơn?
- Học sinh đưa ra những phán đoán ban đầu: Do các phân tử khí va chạm vào đầu ống tiêm và mặt piston.

Hoạt động 2: Xây dựng nội dung Thuyết động học phân tử chất khí (15 phút)
- Giáo viên chia lớp thành các nhóm, yêu cầu học sinh đọc phần I của SGK Vật lí 12 và hoàn thiện phiếu học tập điền vào chỗ trống những nhận định then chốt về chuyển động hỗn loạn, tương tác hút đẩy và nhiệt độ.
- Đại diện nhóm trình bày. Giáo viên chuẩn hóa thành 3 luận điểm cốt lõi của Thuyết động học phân tử chất khí.
- Học sinh tiếp thu bài học, ghi nhận kiến thức vi mô lý giải hiện tượng khuếch tán và chuyển động Brown.

Hoạt động 3: Khảo sát mô hình vi mô "Áp suất chất khí" qua Thí nghiệm mô phỏng (20 phút)
- Giáo viên khởi chạy phần mềm PhET "Gas Properties" (Thuộc tính chất khí). Thực hiện bơm các hạt khí vào một bình kín.
- Giáo viên yêu cầu học sinh quan sát chuyển động của các phân tử khí và va chạm của chúng lên thành bình. Đo nhiệt độ và áp suất tương ứng.
- Giáo viên đặt câu hỏi: Khi thay đổi nhiệt độ chất khí (đun nóng hoặc làm lạnh), tốc độ hỗn loạn của các phân tử thay đổi thế nào? Tần suất suất va chạm lên thành bình và áp suất hiển thị thay đổi ra sao?
- Các nhóm thảo luận, lập bảng ghi nhận dữ liệu thực nghiệm quan sát được từ phần mô phỏng trực quan.
- Đại diện nhóm rút ra kết luận: Nhiệt độ càng cao, tốc độ chuyển động nhiệt càng lớn, phân tử va chạm vào thành bình càng mạnh và dập dồn dẫn đến áp suất càng lớn.

Hoạt động 4: Tổng kết và Luyện tập (5 phút)
- Giáo viên củng cố, phân biệt khí lí tưởng (bỏ qua thể tích riêng phân tử và chỉ tương tác khi va chạm) với khí thực. Giao câu hỏi lý thuyết củng cố.`
  }
];
