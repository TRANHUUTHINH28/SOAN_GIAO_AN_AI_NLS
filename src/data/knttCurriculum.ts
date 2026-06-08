export interface KNTTLesson {
  id: string;
  lessonNumber: number;
  title: string;
  chapter: string;
  coreContent: string; // Detailed description of knowledge points, formulas, goals to feed the AI
}

export const KNTT_CURRICULUM: Record<"Vật lí 10" | "Vật lí 11" | "Vật lí 12", KNTTLesson[]> = {
  "Vật lí 10": [
    {
      id: "vl10-b1",
      lessonNumber: 1,
      title: "Bài 1: Làm quen với Vật lí",
      chapter: "Chương I: Mở đầu",
      coreContent: `BÀI 1: LÀM QUEN VỚI VẬT LÍ
- Mục tiêu nghiên cứu của Vật lí: Nghiên cứu các dạng vận động của vật chất và năng lượng.
- Các phương pháp nghiên cứu: Phương pháp thực nghiệm (quyết định) và Phương pháp lý thuyết (hỗ trợ đắc lực).
- Quá trình phát triển của Vật lí: Vật lí cổ điển (Aristotle, Galileo, Newton) đến Vật lí hiện đại (Einstein, Planck).
- Vai trò của Vật lí: Là cơ sở của khoa học công nghệ, kĩ thuật và đời sống.`
    },
    {
      id: "vl10-b2",
      lessonNumber: 2,
      title: "Bài 2: Vấn đề an toàn trong Vật lí",
      chapter: "Chương I: Mở đầu",
      coreContent: `BÀI 2: VẤN ĐỀ AN TOÀN TRONG VẬT LÍ
- Các nguy cơ mất an toàn trong phòng thực hành: Nguy cơ điện giật, cháy nổ, bỏng, hóa chất độc hại, bức xạ cực tím, tia laser.
- Quy tắc an toàn: Cách sử dụng thiết bị đo dòng điện, tắt nguồn điện trước khi cắm dây, cách đeo găng tay cách nhiệt khi đun sôi nước.
- Biển báo cảnh báo: Biển nguy hiểm điện, biển báo chất độc hại, biển phòng chiếu tia bức xạ.`
    },
    {
      id: "vl10-b3",
      lessonNumber: 3,
      title: "Bài 3: Thực hành tính sai số trong phép đo. Ghi kết quả phép đo",
      chapter: "Chương I: Mở đầu",
      coreContent: `BÀI 3: THỰC HÀNH TÍNH SAI SỐ TRONG PHÉP ĐO. GHI KẾT QUẢ PHÉP ĐO
- Phép đo trực tiếp và phép đo gián tiếp.
- Sai số hệ thống (do dụng cụ) và Sai số ngẫu nhiên (do người đo, điều kiện bên ngoài).
- Tính sai số tuyệt đối, sai số tỉ đối: Delta x / trung bình nhân 100%.
- Cách viết kết quả đo: x = trung bình(x) +/- Delta x.`
    },
    {
      id: "vl10-b4",
      lessonNumber: 4,
      title: "Bài 4: Độ dịch chuyển và quãng đường đi được",
      chapter: "Chương II: Động học",
      coreContent: `BÀI 4: ĐỘ DỊCH CHUYỂN VÀ QUÃNG ĐƯỜNG ĐI ĐƯỢC
- Định nghĩa độ dịch chuyển d: Là một đại lượng vectơ nối điểm đầu và điểm cuối của chuyển động. Kí hiệu d = x2 - x1 nếu đi dọc Ox.
- Định nghĩa quãng đường s: Đoạn đường thực tế vật đi được (luôn dương).
- So sánh s và d: Khi đi thẳng không đổi chiều thì Độ lớn độ dịch chuyển d = s. Khi đổi chiều hoặc đi khép kín thì d khác s.`
    },
    {
      id: "vl10-b5",
      lessonNumber: 5,
      title: "Bài 5: Tốc độ và vận tốc",
      chapter: "Chương II: Động học",
      coreContent: `BÀI 5: TỐC ĐỘ VÀ VẬN TỐC
- Tốc độ trung bình: v_tb = s / t (đặc trưng cho mức độ nhanh chậm chung).
- Tốc độ tức thời: đo tốc độ tại một thời điểm (số chỉ tốc kế).
- Vận tốc trung bình (đại lượng vectơ): v = d / t. Đặc trưng cho độ nhanh chậm và hướng chuyển động.
- Công thức cộng vận tốc: v_13 = v_12 + v_21 (vận tốc tuyệt đối = vận tốc tương đối + vận tốc kéo theo).`
    },
    {
      id: "vl10-b6",
      lessonNumber: 6,
      title: "Bài 6: Thực hành: Đo tốc độ của vật chuyển động",
      chapter: "Chương II: Động học",
      coreContent: `BÀI 6: THỰC HÀNH ĐO TỐC ĐỘ CỦA VẬT CHUYỂN ĐỘNG
- Nguyên lí đo: Dùng cổng quang điện và đồng hồ đo thời gian hiện số để xác định khoảng thời gian t vật chắn cổng quang dầy d. Tốc độ v = d / t.
- Các bước tiến hành: Lắp ráp thanh đỡ, cho xe chạy qua cổng quang điện, lấy số liệu t mang dập vào công thức tính toán và rút ra sai số.`
    },
    {
      id: "vl10-b7",
      lessonNumber: 7,
      title: "Bài 7: Đồ thị độ dịch chuyển - thời gian",
      chapter: "Chương II: Động học",
      coreContent: `BÀI 7: ĐỒ THỊ ĐỘ DỊCH CHUYỂN - THỜI GIAN (d - t)
- Vẽ đồ thị d-t trong chuyển động thẳng đều: Là một đường thẳng đi qua gốc tọa độ hoặc có độ dốc hằng số.
- Ý nghĩa độ dốc (hệ số góc): Độ dốc của đồ thị d-t chính là giá trị Vận tốc v = Delta d / Delta t.
- Cách đọc đồ thị: Xác định vị trí vật ở các thời điểm, xác định thời điểm vật đứng yên (đường đi ngang), đổi chiều (độ dốc đổi dấu).`
    },
    {
      id: "vl10-b8",
      lessonNumber: 8,
      title: "Bài 8: Chuyển động biến đổi. Gia tốc",
      chapter: "Chương II: Động học",
      coreContent: `BÀI 8: CHUYỂN ĐỘNG BIẾN ĐỔI. GIA TỐC
- Chuyển động biến đổi: Là chuyển động có vận tốc biến đổi theo thời gian.
- Khái niệm gia tốc a: Là đại lượng vectơ đặc trưng cho sự biến thiên nhanh hay chậm của vận tốc theo thời gian.
- Công thức gia tốc trung bình: a = (v_t - v_o) / (t - t_o) = Delta v / Delta t. Đơn vị: m/s^2.`
    },
    {
      id: "vl10-b9",
      lessonNumber: 9,
      title: "Bài 9: Chuyển động thẳng biến đổi đều",
      chapter: "Chương II: Động học",
      coreContent: `BÀI 9: CHUYỂN ĐỘNG THẲNG BIẾN ĐỔI ĐỀU
- Định nghĩa: Chuyển động thẳng có gia tốc a không đổi theo thời gian. Gồm nhanh dần đều (a.v > 0) và chậm dần đều (a.v < 0).
- Hệ phương trình động học:
  1) v = v_o + a.t
  2) d = v_o.t + 1/2.a.t^2
  3) Liên hệ không thời gian: v^2 - v_o^2 = 2.a.d
- Đồ thị vận tốc - thời gian (v - t): Là một đường thẳng dốc lên hoặc dốc xuống. Diện tích dưới đồ thị v-t chính bằng Độ dịch chuyển d.`
    },
    {
      id: "vl10-b10",
      lessonNumber: 10,
      title: "Bài 10: Sự rơi tự do",
      chapter: "Chương II: Động học",
      coreContent: `BÀI 10: SỰ RƠI TỰ DO
- Định nghĩa sự rơi tự do: Là sự rơi của các vật chỉ dưới tác dụng của trọng lực.
- Đặc điểm: Phương thẳng đứng, chiều từ trên xuống dưới, là chuyển động thẳng nhanh dần đều không vận tốc đầu (v_o = 0).
- Gia tốc rơi tự do g: Tại một nơi quy định g sấp xỉ 9,8 m/s^2 hoặc 10 m/s^2.
- Công thức rơi tự do từ độ cao h:
  v = g.t
  h = s = 1/2.g.t^2
  v^2 = 2.g.h`
    },
    {
      id: "vl10-b11",
      lessonNumber: 11,
      title: "Bài 11: Thực hành: Đo gia tốc rơi tự do",
      chapter: "Chương II: Động học",
      coreContent: `BÀI 11: THỰC HÀNH ĐO GIA TỐC RƠI TỰ DO
- Nguyên lí: Thả quả dọi sắt hoặc viên bi thép rơi qua cổng quang điện kép gắn trên thước đứng dọc để đo thời gian rơi s. Tính gia tốc g từ s = 1/2.g.t^2 => g = 2.s / t^2.
- Thí nghiệm ảo bổ trợ: App Phyphox đo âm thanh va chạm rơi tự do hoặc Tracker Video Analysis để bám đuổi quỹ đạo hạt rơi.`
    },
    {
      id: "vl10-b12",
      lessonNumber: 12,
      title: "Bài 12: Chuyển động ném",
      chapter: "Chương II: Động học",
      coreContent: `BÀI 12: CHUYỂN ĐỘNG NÉM
- Chuyển động ném ngang từ độ cao h với vận tốc v_o:
  + Dọc trục Ox (Nằm ngang): Chuyển động thẳng đều: a_x = 0, v_x = v_o, x = v_o.t.
  + Dọc trục Oy (Thẳng đứng): Chuyển động rơi tự do: a_y = g, v_y = g.t, y = 1/2.g.t^2.
  + Phương trình quỹ đạo parabol: y = (g / (2.v_o^2)).x^2.
  + Thời gian chạm đất: t = sqrt(2h/g).
  + Tầm xa: L = v_o.sqrt(2h/g).
- Chuyển động ném xiên góc alpha: Tính toán tầm cao, tầm xa.`
    },
    {
      id: "vl10-b13",
      lessonNumber: 13,
      title: "Bài 13: Tổng hợp lực và phân tích lực. Cân bằng lực",
      chapter: "Chương III: Động lực học",
      coreContent: `BÀI 13: TỔNG HỢP VÀ PHÂN TÍCH LỰC. CÂN BẰNG LỰC
- Khái niệm Lực: Là đại lượng vectơ đặc trưng cho tương tác giữa các vật, gây ra gia tốc hoặc làm vật biến dạng.
- Tổng hợp lực: Thay thế các lực đồng thời tác dụng vào vật bằng một lực duy nhất có tác dụng giống hệt. Quy tắc hình bình hành: F = F1 + F2.
- Phân tích lực: Thay thế một lực bằng hai hay nhiều lực thành phần có tác dụng tương đương.
- Trạng thái cân bằng lực: Khi hợp lực tác dụng lên vật bằng 0.`
    },
    {
      id: "vl10-b14",
      lessonNumber: 14,
      title: "Bài 14: Định luật 1 Newton",
      chapter: "Chương III: Động lực học",
      coreContent: `BÀI 14: ĐỊNH LUẬT 1 NEWTON (ĐỊNH LUẬT QUÁN TÍNH)
- Phát biểu: Nếu một vật không chịu tác dụng của lực nào hoặc chịu tác dụng của các lực có hợp lực bằng 0 thì vật đang đứng yên sẽ tiếp tục đứng yên, đang chuyển động sẽ tiếp tục chuyển động thẳng đều.
- Quán tính: Xu hướng bảo toàn trạng thái đứng yên hoặc chuyển động của vật. Thể hiện qua khối lượng (đại lượng đo lường quán tính).`
    },
    {
      id: "vl10-b15",
      lessonNumber: 15,
      title: "Bài 15: Định luật 2 Newton",
      chapter: "Chương III: Động lực học",
      coreContent: `BÀI 15: ĐỊNH LUẬT 2 NEWTON
- Phát biểu: Gia tốc của một vật tỉ lệ thuận với lực tác dụng và tỉ lệ nghịch với khối lượng của vật.
- Công thức: a = F / m <=> F = m.a.
- Hướng của gia tốc a trùng với hướng của hợp lực F tác dụng.`
    },
    {
      id: "vl10-b16",
      lessonNumber: 16,
      title: "Bài 16: Định luật 3 Newton",
      chapter: "Chương III: Động lực học",
      coreContent: `BÀI 16: ĐỊNH LUẬT 3 NEWTON (TƯƠNG TÁC LỰC)
- Phát biểu: Trong mọi trường hợp, khi vật A tác dụng lên vật B một lực, thì vật B cũng tác dụng ngược lại vật A một lực. Hai lực này là hai lực trực đối.
- Công thức: F_AB = - F_BA.
- Đặc điểm cặp lực "Trực đối / Hành động và Phản lực": Xuất hiện và biến mất đồng thời, cùng giá, ngược chiều, cùng độ lớn, đặt vào hai vật khác nhau (không cân bằng nhau).`
    },
    {
      id: "vl10-b17",
      lessonNumber: 17,
      title: "Bài 17: Trọng lực và lực căng",
      chapter: "Chương III: Động lực học",
      coreContent: `BÀI 17: TRỌNG LỰC VÀ LỰC CĂNG
- Trọng lực P: Lực hút của Trái Đất tác dụng lên vật, đặt tại trọng tâm, phương thẳng đứng chiều xuống dưới. Công thức P = m.g. Trọng lượng là độ lớn của trọng lực.
- Lực căng dây T: Xuất hiện dọc theo sợi dây khi bị kéo căng, có xu hướng chống lại sự kéo dãn, điểm đặt ở đầu dây sát vật.`
    },
    {
      id: "vl10-b18",
      lessonNumber: 18,
      title: "Bài 18: Lực ma sát",
      chapter: "Chương III: Động lực học",
      coreContent: `BÀI 18: LỰC MA SÁT
- Lực ma sát trượt: Xuất hiện ở mặt tiếp xúc khi vật này trượt trên bề mặt vật khác, cản trở chuyển động trượt. Công thức: F_mst = mu * N (mu là hệ số ma sát trượt, N là phản lực vuông góc tiếp xúc).
- Lực ma sát nghỉ: Cản trở xu hướng trượt khi có ngoại lực tác dụng nhưng vật chưa trượt. Có giá trị cực đại bằng lực ma sát trượt dạn dầy.`
    },
    {
      id: "vl10-b19",
      lessonNumber: 19,
      title: "Bài 19: Lực cản và lực nâng",
      chapter: "Chương III: Động lực học",
      coreContent: `BÀI 19: LỰC CẢN VÀ LỰC NÂNG CỦA CHẤT LƯU
- Chất lưu: Không khí hoặc chất lỏng.
- Lực cản chất lưu: Xuất hiện khi một vật chuyển động trong chất lưu, luôn ngược chiều chuyển động, phụ thuộc vào hình dạng vật, tốc độ vật và bản chất chất lưu.
- Lực nâng chất lưu: Xuất hiện do sự chênh lệch áp suất khi chất lưu chảy quanh vật (lực nâng máy bay Bernoulli hoặc lực đẩy Archimedes).`
    },
    {
      id: "vl10-b21",
      lessonNumber: 21,
      title: "Bài 21: Moment lực. Cân bằng của vật rắn",
      chapter: "Chương III: Động lực học",
      coreContent: `BÀI 21: MOMENT LỰC. CÂN BẰNG CỦA VẬT RẮN
- Moment lực M: Đặc trưng cho tác dụng làm quay của lực quanh một trục. M = F * d (d là cánh tay đòn - khoảng cách từ trục quay đến giá của lực). Đơn vị: N.m.
- Quy tắc moment lực: Một vật rắn có trục quay cố định ở trạng thái cân bằng khi tổng moment các lực làm quay vật theo chiều kim đồng hồ bằng tổng moment các lực làm quay vật ngược chiều kim đồng hồ.`
    },
    {
      id: "vl10-b23",
      lessonNumber: 23,
      title: "Bài 23: Năng lượng. Công cơ học",
      chapter: "Chương IV: Năng lượng, công, công suất",
      coreContent: `BÀI 23: NĂNG LƯỢNG. CÔNG CƠ HỌC
- Khái niệm Năng lượng: Đặc trưng cho khả năng thực hiện công của vật, có thể truyền từ vật này sang vật khác hoặc biến đổi giữa các dạng.
- Công cơ học A: A = F * s * cos(alpha) (alpha là góc hợp bởi hướng của lực F và hướng dịch chuyển s).
- Biện luận góc alpha:
  + alpha < 90: Công phát động (A > 0).
  + alpha = 90: Lực không sinh công (A = 0).
  + alpha > 90: Công cản (A < 0).`
    },
    {
      id: "vl10-b24",
      lessonNumber: 24,
      title: "Bài 24: Công suất",
      chapter: "Chương IV: Năng lượng, công, công suất",
      coreContent: `BÀI 24: CÔNG SUẤT
- Khái niệm Công suất P: Là đại lượng đặc trưng cho tốc độ thực hiện công của lực (đo bằng công thực hiện được trong một đơn vị thời gian).
- Công thức: P = A / t. Đơn vị: W (Watt) hoặc HP (mã lực).
- Công thức liên hệ với vận tốc: P = F * v * cos(alpha).`
    },
    {
      id: "vl10-b25",
      lessonNumber: 25,
      title: "Bài 25: Động năng. Thế năng",
      chapter: "Chương IV: Năng lượng, công, công suất",
      coreContent: `BÀI 25: ĐỘNG NĂNG. THẾ NĂNG
- Động năng W_d: Năng lượng vật có được do chuyển động. W_d = 1/2.m.v^2.
- Định lí động năng: Delta W_d = A_ngoailuc.
- Thế năng trọng trường W_t: Năng lượng tương tác giữa Trái Đất và vật, phụ thuộc vị trí đặt vật. W_t = m.g.h (h là độ cao so với mốc thế năng).`
    },
    {
      id: "vl10-b26",
      lessonNumber: 26,
      title: "Bài 26: Cơ năng và định luật bảo toàn cơ năng",
      chapter: "Chương IV: Năng lượng, công, công suất",
      coreContent: `BÀI 26: CƠ NĂNG VÀ ĐỊNH LUẬT BẢO TOÀN CƠ NĂNG
- Cơ năng W: Là tổng động năng và thế năng của vật: W = W_d + W_t = 1/2.m.v^2 + m.g.h.
- Định luật bảo toàn cơ năng: Khi một vật chỉ chịu tác dụng của lực thế (như trọng lực, lực đàn hồi), cơ năng của vật là một đại lượng bảo toàn: W = const.`
    },
    {
      id: "vl10-b28",
      lessonNumber: 28,
      title: "Bài 28: Động lượng",
      chapter: "Chương V: Động lượng",
      coreContent: `BÀI 28: ĐỘNG LƯỢNG
- Định nghĩa Động lượng p: p = m.v. Là đại lượng vectơ đặc trưng cho xu hướng truyền chuyển động. Đơn vị: kg.m/s hoặc N.s.
- Mối liên hệ lực và động lượng: F = Delta p / Delta t (xung lượng của lực bằng độ biến thiên động lượng).`
    },
    {
      id: "vl10-b29",
      lessonNumber: 29,
      title: "Bài 29: Định luật bảo toàn động lượng",
      chapter: "Chương V: Động lượng",
      coreContent: `BÀI 29: ĐỊNH LUẬT BẢO TOÀN ĐỘNG LƯỢNG
- Hệ kín (hệ cô lập): Hệ các vật chỉ tương tác nội lực với nhau, ngoại lực bằng 0 hoặc triệt tiêu.
- Định luật bảo toàn động lượng: Tổng động lượng của một hệ kín là một đại lượng bảo toàn: p_he_truoc = p_he_sau.
- Ứng dụng: Va chạm đàn hồi, va chạm mềm, chuyển động bằng phản lực (tên lửa).`
    }
  ],
  "Vật lí 11": [
    {
      id: "vl11-b1",
      lessonNumber: 1,
      title: "Bài 1: Dao động điều hòa",
      chapter: "Chương I: Dao động",
      coreContent: `BÀI 1: DAO ĐỘNG ĐIỀU HÒA
- Khái niệm dao động: Chuyển động qua lại quanh một vị trí cân bằng.
- Dao động tuần hoàn: Chuyển động tuần hoàn lặp đi lặp lại sau những khoảng thời gian bằng nhau gọi là chu kì T.
- Ly độ x: Độ lệch khỏi vị trí cân bằng.
- Phương trình li độ dao động điều hòa: x = A.cos(omega.t + phi). Trong đó A là biên độ, (omega.t + phi) là pha dao động, phi là pha ban đầu.`
    },
    {
      id: "vl11-b2",
      lessonNumber: 2,
      title: "Bài 2: Mô tả dao động điều hòa",
      chapter: "Chương I: Dao động",
      coreContent: `BÀI 2: MÔ TẢ DAO ĐỘNG ĐIỀU HÒA
- Chu kì T, Tần số f (f = 1/T), Tần số góc omega: liên hệ omega = 2.pi.f = 2.pi / T.
- Mối liên hệ dao động điều hòa và chuyển động tròn đều: Li độ x của dao động điều hòa là hình chiếu của chất điểm chuyển động tròn đều lên trục Ox.
- Đồ thị li độ - thời gian: Là đường hình sin.`
    },
    {
      id: "vl11-b3",
      lessonNumber: 3,
      title: "Bài 3: Vận tốc, gia tốc trong dao động điều hòa",
      chapter: "Chương I: Dao động",
      coreContent: `BÀI 3: VẬN TỐC VÀ GIA TỐC TRONG DAO ĐỘNG ĐIỀU HÒA
- Phương trình Vận tốc v: v = x' = - omega.A.sin(omega.t + phi) = omega.A.cos(omega.t + phi + pi/2). Vận tốc nhanh pha pi/2 so với li độ. v_max = omega.A (qua vị trí cân bằng).
- Phương trình Gia tốc a: a = v' = x'' = - omega^2.A.cos(omega.t + phi) = - omega^2.x. Gia tốc ngược pha so với li độ. a_max = omega^2.A (ở biên). Vectơ gia tốc luôn hướng về VTCB.`
    },
    {
      id: "vl11-b4",
      lessonNumber: 4,
      title: "Bài 4: Động năng. Thế năng. Sự chuyển hóa năng lượng trong dao động điều hòa",
      chapter: "Chương I: Dao động",
      coreContent: `BÀI 4: ĐỘNG NĂNG. THẾ NĂNG. CHUYỂN HÓA NĂNG LƯỢNG TRONG DĐĐH
- Động năng: W_d = 1/2.m.v^2 = 1/2.m.omega^2.A^2.sin^2(omega.t + phi).
- Thế năng con lắc lò xo: W_t = 1/2.k.x^2 = 1/2.m.omega^2.x^2 = 1/2.m.omega^2.A^2.cos^2(omega.t + phi).
- Cơ năng: W = W_d + W_t = 1/2.m.omega^2.A^2 = 1/2.k.A^2. Là hằng số bảo toàn.
- Sự biến thiên năng lượng: Động năng và thế năng biến thiên tuần hoàn với chu kì T' = T/2, tần số f' = 2.f.`
    },
    {
      id: "vl11-b5",
      lessonNumber: 5,
      title: "Bài 5: Dao động tắt dần. Dao động cưỡng bức. Hiện tượng cộng hưởng",
      chapter: "Chương I: Dao động",
      coreContent: `BÀI 5: DAO ĐỘNG TẮT DẦN. DAO ĐỘNG CƯỠNG BỨC. CỘNG HƯỞNG
- Dao động tắt dần: Dao động có biên độ và cơ năng giảm dần theo thời gian do ma sát sinh ra nhiệt lượng.
- Dao động cưỡng bức: Dao động dưới tác dụng của một ngoại lực cưỡng bức tuần hoàn F = Fo.cos(omega_cb.t). Tần số của dao động cưỡng bức bằng tần số lực cưỡng bức.
- Hiện tượng Cộng hưởng: Biên độ dao động cưỡng bức đạt cực đại khi tần số lực cưỡng bức omega_cb bằng tần số góc riêng omega_o của hệ dao động.`
    },
    {
      id: "vl11-b8",
      lessonNumber: 8,
      title: "Bài 8: Mô tả sóng",
      chapter: "Chương II: Sóng",
      coreContent: `BÀI 8: MÔ TẢ SÓNG
- Khái niệm sóng: Sự lan truyền dao động tuần hoàn trong một môi trường đàn hồi (chỉ lan truyền pha dao động và năng lượng, phần tử môi trường chỉ dao động tại chỗ).
- Các đại lượng đặc trưng của sóng: Biên độ sóng A, Chu kì T, Tần số f, Tốc độ truyền sóng v, Bước sóng lambda: lambda = v * T = v / f.`
    },
    {
      id: "vl11-b9",
      lessonNumber: 9,
      title: "Bài 9: Sóng ngang. Sóng dọc. Sự truyền năng lượng của sóng",
      chapter: "Chương II: Sóng",
      coreContent: `BÀI 9: SÓNG NGANG. SÓNG DỌC. TRUYỀN NĂNG LƯỢNG SÓNG
- Sóng ngang: Các phần tử của môi trường dao động theo phương vuông góc với phương truyền sóng (ví dụ sóng trên mặt nước, sóng trên dây đàn hồi). Truyền được trong chất rắn và mặt chất lỏng.
- Sóng dọc: Các phần tử dao động dọc theo phương truyền sóng (ví dụ sóng âm trong không khí, sóng dãn lò xo). Truyền được trong cả chất rắn, lỏng, khí.`
    },
    {
      id: "vl11-b11",
      lessonNumber: 11,
      title: "Bài 11: Sóng điện từ",
      chapter: "Chương II: Sóng",
      coreContent: `BÀI 11: SÓNG ĐIỆN TỪ
- Định nghĩa: Là điện từ trường lan truyền trong không gian dưới dạng sóng.
- Đặc điểm: Là sóng ngang, truyền được trong chân không với tốc độ c = 3.10^8 m/s. Vectơ điện trường E, vectơ cảm ứng từ B và phương truyền sóng v luôn đôi một vuông góc tạo thành một tam diện thuận.
- Thang sóng điện từ: Sóng vô tuyến, tia hồng ngoại, ánh sáng nhìn thấy, tia tử ngoại, tia X, tia gamma.`
    },
    {
      id: "vl11-b12",
      lessonNumber: 12,
      title: "Bài 12: Giao thoa sóng",
      chapter: "Chương II: Sóng",
      coreContent: `BÀI 12: GIAO THOA SÓNG
- Nguồn kết hợp: Hai nguồn dao động cùng phương, cùng tần số và có hiệu số pha không đổi theo thời gian.
- Hiện tượng Giao thoa: Là hiện tượng hai sóng kết hợp gặp nhau tạo ra các gợn sóng cực đại xen kẽ cực tiểu cố định.
- Công thức vị trí:
  + Cực đại giao thoa: d2 - d1 = k.lambda.
  + Cực tiểu giao thoa: d2 - d1 = (k + 1/2).lambda.`
    },
    {
      id: "vl11-b13",
      lessonNumber: 13,
      title: "Bài 13: Sóng dừng",
      chapter: "Chương II: Sóng",
      coreContent: `BÀI 13: SÓNG DỰNG
- Định nghĩa: Sóng có các nút và bụng cố định trong không gian do sự giao thoa giữa sóng tới và sóng phản xạ.
- Đặc điểm:
  + Nút sóng: Các vị trí đứng yên biên độ bằng 0. Bụng sóng: Vị trí dao động với biên độ cực đại.
  + Khoảng cách giữa hai nút hoặc hai bụng liên tiếp bằng lambda / 2. Khoảng cách giữa một nút và một bụng kề nhau là lambda / 4.
- Điều kiện sóng dừng trên dây có chiều dài L:
  + Hai đầu cố định: L = k * (lambda / 2). (k bụng, k+1 nút).
  + Một đầu cố định một đầu tự do: L = (2k + 1) * (lambda / 4).`
    },
    {
      id: "vl11-b16",
      lessonNumber: 16,
      title: "Bài 16: Lực tương tác giữa các điện tích",
      chapter: "Chương III: Điện trường",
      coreContent: `BÀI 16: LỰC TƯƠNG TÁC GIỮA CÁC ĐIỆN TÍCH (ĐỊNH LUẬT COULOMB)
- Hai loại điện tích: Điện tích dương (+), Điện tích âm (-). Các điện tích cùng dấu đẩy nhau, trái dấu hút nhau.
- Thuyết electron sơ lược: Thuyết dựa trên sự di cư của electron để giải thích nhiễm điện.
- Định luật Coulomb: F = k * |q1.q2| / (epsilon.r^2). Trong đó k = 9.10^9 N.m^2/C^2, epsilon là hằng số điện môi của môi trường.`
    },
    {
      id: "vl11-b17",
      lessonNumber: 17,
      title: "Bài 17: Khái niệm điện trường",
      chapter: "Chương III: Điện trường",
      coreContent: `BÀI 17: KHÁI NIỆM ĐIỆN TRƯỜNG
- Điện trường: Môi trường vật chất bao quanh các điện tích và truyền tương tác điện.
- Vectơ Cường độ điện trường E: Đại lượng đặc trưng cho khả năng tác dụng lực của điện trường. E = F / q. Đơn vị: V/m.
- Điện trường của điện tích điểm Q: E = k * |Q| / (epsilon * r^2). Hướng ra xa nếu Q dương, hướng vào nếu Q âm.`
    },
    {
      id: "vl11-b18",
      lessonNumber: 18,
      title: "Bài 18: Điện trường đều",
      chapter: "Chương III: Điện trường",
      coreContent: `BÀI 18: ĐIỆN TRƯỜNG ĐỀU
- Định nghĩa: Điện trường có vectơ cường độ điện trường E tại mọi điểm đều bằng nhau (cùng phương, cùng chiều và cùng độ lớn).
- Thiết lập điện trường đều: Giữa hai bản kim loại phẳng đặt song song, nhiễm điện trái dấu bằng nhau.
- Các đường sức điện trường đều: Các đường thẳng song song, cách đều nhau.`
    },
    {
      id: "vl11-b20",
      lessonNumber: 20,
      title: "Bài 20: Điện dung. Tụ điện",
      chapter: "Chương III: Điện trường",
      coreContent: `BÀI 20: ĐIỆN DUNG. TỤ ĐIỆN
- Hệ thống tích điện tụ điện: Gồm hai bản dẫn điện đặt gần nhau, ngăn cách bởi một lớp điện môi.
- Điện dung C: Đại lượng đặc trưng cho khả năng tích điện của tụ ở một hiệu điện thế nhất định. Q = C * U <=> C = Q / U. Đơn vị: F (Farad).
- Năng lượng điện trường của tụ điện: W_c = 1/2 * C * U^2 = 1/2 * Q * U = 1/2 * Q^2 / C.`
    },
    {
      id: "vl11-b25",
      lessonNumber: 25,
      title: "Bài 25: Năng lượng và công suất điện",
      chapter: "Chương IV: Dòng điện không đổi. Mạch điện",
      coreContent: `BÀI 25: NĂNG LƯỢNG VÀ CÔNG SUẤT ĐIỆN
- Công của dòng điện (điện năng tiêu thụ): $A = U \\cdot I \\cdot t$.
- Công suất điện $P$: Đại lượng đặc trưng cho tốc độ tiêu thụ điện năng: $P = \\frac{A}{t} = U \\cdot I$.
- Định luật Joule-Lenz (nhiệt lượng tỏa ra trên vật dẫn): $Q = I^2 \\cdot R \\cdot t$. Công suất tỏa nhiệt: $P = I^2 \\cdot R$.`
    }
  ],
  "Vật lí 12": [
    {
      id: "vl12-b1",
      lessonNumber: 1,
      title: "Bài 1: Cấu trúc của chất. Sự chuyển trạng thái",
      chapter: "Chương I: Vật lí nhiệt",
      coreContent: `BÀI 1: CẤU TRÚC CỦA CHẤT. SỰ CHUYỂN TRẠNG THÁI
- Thuyết động học phân tử chất khí: các chất cấu tạo từ phân tử chuyển động không ngừng; tương tác hút-đẩy phụ thuộc khoảng cách.
- Ba thể của chất: Rắn (vị trí cân bằng cố định), lỏng (dao động quanh vị trí di động, thể tích xác định, hình dạng phụ thuộc bình chứa), khí (khoảng cách phân tử lớn, chuyển động hỗn loạn, không có thể tích và hình dạng xác định).
- Sự chuyển trạng thái (chuyển pha): Nóng chảy - Đông đặc; Hóa hơi (bay hơi ở mặt thoáng và sôi ở toàn khối lỏng) - Ngưng tụ; Thăng hoa - Ngưng kết.`
    },
    {
      id: "vl12-b2",
      lessonNumber: 2,
      title: "Bài 2: Nội năng. Định luật I của nhiệt động lực học",
      chapter: "Chương I: Vật lí nhiệt",
      coreContent: `BÀI 2: NỘI NĂNG. ĐINH LUẬT I CỦA NHIỆT ĐỘNG LỰC HỌC
- Khái niệm Nội năng ($U$): Là tổng động năng chuyển động nhiệt và thế năng tương tác của các phân tử cấu tạo nên hệ.
- Hai cách làm thay đổi nội năng: Thực hiện công ($W$) và Truyền nhiệt (Nhiệt lượng $Q$).
- Định luật I Nhiệt động lực học: Độ biến thiên nội năng $\\Delta U$ của hệ bằng tổng công và nhiệt lượng hệ nhận được: $\\Delta U = Q + W$. Quy ước dấu: $Q > 0$ nhận nhiệt, $Q < 0$ tỏa nhiệt; $W > 0$ nhận công, $W < 0$ thực hiện công.`
    },
    {
      id: "vl12-b3",
      lessonNumber: 3,
      title: "Bài 3: Nhiệt độ. Thang nhiệt độ – Nhiệt kế",
      chapter: "Chương I: Vật lí nhiệt",
      coreContent: `BÀI 3: NHIỆT ĐỘ. THANG NHIỆT ĐỘ – NHIỆT KẾ
- Trạng thái cân bằng nhiệt: Khi hai vật tiếp xúc có nhiệt độ bằng nhau, không còn sự truyền nhiệt ròng giữa chúng. Có tính chất truyền bắc cầu (Định luật 0).
- Thang đo nhiệt độ: Celsius ($^\\circ$C: điểm đóng băng nước $0^\\circ$C, điểm sôi $100^\\circ$C) và Kelvin (K: thang đo nhiệt độ tuyệt đối). Công thức chuyển đổi: $T(\\text{K}) = t(^\\circ\\text{C}) + 273,15$.
- Nhiệt kế: Hoạt động dựa trên sự thay đổi tính chất vật lí theo nhiệt độ (thể tích chất lỏng, điện trở điện tử, áp suất khí).`
    },
    {
      id: "vl12-b4",
      lessonNumber: 4,
      title: "Bài 4: Nhiệt dung riêng",
      chapter: "Chương I: Vật lí nhiệt",
      coreContent: `BÀI 4: NHIỆT DUNG RIÊNG
- Khái niệm: Nhiệt lượng $Q$ cần truyền để làm tăng nhiệt độ của một khối lượng $m$ chất lên một độ biến thiên $\\Delta T$: $Q = m \\cdot c \\cdot \\Delta T$.
- Định nghĩa nhiệt dung riêng $c$: Là nhiệt lượng cần truyền cho 1 kg chất để làm nhiệt độ của nó tăng thêm 1 K (hoặc $1^\\circ$C). Đơn vị: $\\text{J}/(\\text{kg}\\cdot\\text{K})$.
- Ứng dụng: Nhờ nhiệt dung riêng của nước lớn ($c \\approx 4200\\text{ J/kg}\\cdot\\text{K}$), nước được dùng làm chất làm mát động cơ, điều hòa khí hậu đại dương.`
    },
    {
      id: "vl12-b5",
      lessonNumber: 5,
      title: "Bài 5: Thực hành: Đo nhiệt nóng chảy riêng và nhiệt hóa hơi riêng",
      chapter: "Chương I: Vật lí nhiệt",
      coreContent: `BÀI 5: THỰC HÀNH: ĐO NHIỆT NÓNG CHẢY RIÊNG VÀ NHIỆT HÓA HƠI RIÊNG
- Nguyên lý đo nhiệt nóng chảy riêng $\\lambda$ (của nước đá): Đun nóng chảy nước đá trong bình nhiệt lượng kế, ghi lại công suất nhiệt dùng và đo phần khối lượng nước thu được sau đá tan, tính theo: $\\lambda = \\frac{Q}{m}$.
- Nguyên lý đo nhiệt hóa hơi riêng $L$ (của nước): Ghi nhận điện lượng cấp và tổng khối lượng nước bay hơi của bình sau khi sôi hoàn toàn: $L = \\frac{Q}{m}$.`
    },
    {
      id: "vl12-b6",
      lessonNumber: 6,
      title: "Bài 6: Định luật Boyle",
      chapter: "Chương II: Khí lí tưởng",
      coreContent: `BÀI 6: ĐINH LUẬT BOYLE
- Trạng thái của một khối lượng khí xác định đặc trưng bởi ba thông số trạng thái: áp suất $p$, thể tích $V$, nhiệt độ tuyệt đối $T$.
- Quá trình đẳng nhiệt: Quá trình biến đổi trạng thái của một khối lượng khí xác định khi giữ nhiệt độ tuyệt đối $T$ không đổi.
- Định luật Boyle: Trong quá trình đẳng nhiệt của một lượng khí xác định, áp suất tỉ lệ nghịch với thể tích: $p \\propto \\frac{1}{V} \\Leftrightarrow p \\cdot V = \\text{const} \\Leftrightarrow p_1 V_1 = p_2 V_2$.`
    },
    {
      id: "vl12-b7",
      lessonNumber: 7,
      title: "Bài 7: Định luật Charles",
      chapter: "Chương II: Khí lí tưởng",
      coreContent: `BÀI 7: ĐINH LUẬT CHARLES
- Quá trình đẳng tích: Quá trình biến đổi trạng thái của một khối lượng khí xác định khi giữ thể tích $V$ không đổi.
- Định luật Charles: Trong quá trình đẳng tích của một lượng khí xác định, áp suất tỉ lệ thuận với nhiệt độ tuyệt đối: $p \\propto T \\Leftrightarrow \\frac{p}{T} = \\text{const} \\Leftrightarrow \\frac{p_1}{T_1} = \\frac{p_2}{T_2}$.`
    },
    {
      id: "vl12-b8",
      lessonNumber: 8,
      title: "Bài 8: Phương trình trạng thái của khí lí tưởng",
      chapter: "Chương II: Khí lí tưởng",
      coreContent: `BÀI 8: PHƯƠNG TRÌNH TRẠNG THÁI CỦA KHÍ LÍ TƯỞNG
- Khí lí tưởng: Khí mà các phân tử được coi là các chất điểm và chỉ tương tác khi va chạm.
- Phương trình trạng thái Clapeyron: Liên hệ giữa ba thông số trạng thái $(p, V, T)$ của một lượng khí xác định: $\\frac{p_1 \\cdot V_1}{T_1} = \\frac{p_2 \\cdot V_2}{T_2} = \\text{const}$.`
    },
    {
      id: "vl12-b9",
      lessonNumber: 9,
      title: "Bài 9: Áp suất khí theo mô hình động học phân tử. Quan hệ giữa động năng phân tử và nhiệt độ",
      chapter: "Chương II: Khí lí tưởng",
      coreContent: `BÀI 9: ÁP SUẤT KHÍ THEO MÔ HÌNH ĐỘNG HỌC PHÂN TỬ. QUAN HỆ GIỮA ĐỘNG NĂNG PHÂN TỬ VÀ NHIỆT ĐỘ
- Áp suất khí lí tưởng tác dụng lên thành bình do sự va chạm hỗn độn của phân tử: $p = \\frac{1}{3} \\cdot \\mu_0 \\cdot m \\cdot \\overline{v^2}$ với $\\mu_0$ là mật độ phân tử.
- Động năng tịnh tiến trung bình phân tử khí tỉ lệ thuận với nhiệt độ tuyệt đối $T$: $\\overline{E_d} = \\frac{3}{2} \\cdot k_B \\cdot T$ (với $k_B$ là hằng số Boltzmann).`
    },
    {
      id: "vl12-b10",
      lessonNumber: 10,
      title: "Bài 10: Thực hành: Đo áp suất khí và kiểm chứng định luật Boyle",
      chapter: "Chương II: Khí lí tưởng",
      coreContent: `BÀI 10: THỰC HÀNH: ĐO ÁP SUẤT KHÍ VÀ KIỂM CHỨNG ĐỊNH LUẬT BOYLE
- Mục đích: Đo áp suất $p$ và thể tích $V$ tương ứng của lượng khí trong xilanh để kiểm chứng tính đúng đắn định luật Boyle.
- Phương pháp: Dịch chuyển pittông và ghi nhận các cặp giá trị $(V, p)$. Vẽ đồ thị biểu diễn áp suất $p$ theo nghịch đảo thể tích $\\frac{1}{V}$ để kiểm chứng.`
    },
    {
      id: "vl12-b11",
      lessonNumber: 11,
      title: "Bài 11: Từ trường",
      chapter: "Chương III: Từ trường",
      coreContent: `BÀI 11: TỪ TRƯỜNG
- Khái niệm từ trường: Môi trường vật chất đặc biệt xung quanh dòng điện hoặc nam châm, tác dụng lực từ lên dòng điện hoặc nam châm khác đặt trong nó.
- Đường sức từ: Đường được vẽ trong từ trường sao cho tiếp tuyến with nó trùng hướng của cảm ứng từ $\\vec{B}$. Chiều đường sức từ nam châm đi ra ở cực Bắc ($N$) và đi vào ở cực Nam ($S$).`
    },
    {
      id: "vl12-b12",
      lessonNumber: 12,
      title: "Bài 12: Lực từ. Cảm ứng từ",
      chapter: "Chương III: Từ trường",
      coreContent: `BÀI 12: LỰC LỪ. CẢM ỨNG TỪ
- Cảm ứng từ $\\vec{B}$ tại một điểm đặc trưng cho độ mạnh yếu và hướng của từ trường. Độ lớn: $B = \\frac{F}{I \\cdot L \\cdot \\sin\\theta}$. Đơn vị: Tesla ($T$).
- Lực lượng từ Laplace tác dụng lên đoạn dây dẫn $L$ có dòng điện $I$ đặt trong từ trường đều $\\vec{B}$: $\\vec{F}$ có độ lớn $F = B \\cdot I \\cdot L \\cdot \\sin\\theta$.`
    },
    {
      id: "vl12-b13",
      lessonNumber: 13,
      title: "Bài 13: Từ trường của dòng điện chạy trong các dây dẫn có hình dạng đặc biệt",
      chapter: "Chương III: Từ trường",
      coreContent: `BÀI 13: TỪ TRƯỜNG CỦA DÒNG ĐIỆN CHẠY TRONG CÁC DÂY DẪN CÓ HÌNH DẠNG ĐẶC BIỆT
- Từ trường của dòng điện thẳng dài: $B = 2 \\cdot 10^{-7} \\cdot \\frac{I}{r}$.
- Từ trường tại tâm của dòng điện tròn: $B = 2\\pi \\cdot 10^{-7} \\cdot N \\cdot \\frac{I}{R}$.
- Từ trường trong lòng ống dây dài dẫn điện: $B = 4\\pi \\cdot 10^{-7} \\cdot n \\cdot I = 4\\pi \\cdot 10^{-7} \\cdot \\frac{N}{L} \\cdot I$.`
    },
    {
      id: "vl12-b14",
      lessonNumber: 14,
      title: "Bài 14: Từ trường Trái Đất. Sử dụng la bàn điện tử đo từ trường Trái Đất",
      chapter: "Chương III: Từ trường",
      coreContent: `BÀI 14: TỪ TRƯỜNG TRÁI ĐẤT. ĐO TỪ TRƯỜNG TRÁI ĐẤT BẰNG LA BÀN ĐIỆN TỬ
- Khái niệm: Trái Đất có từ trường khổng lồ giống nam châm thẳng khổng lồ đặt xiên góc với trục quay địa lý. Cực bắc từ học nằm gần cực nam địa lý và ngược lại.
- Thao tác: Sử dụng cảm biến từ trường (Magnetometer) tích hợp trong điện thoại thông minh (thông qua ứng dụng la bàn điện tử của Phyphox hoặc la bàn số) để đo cường độ B của từ trường Trái Đất tính bằng Tesla (microTesla) tại các hướng và vĩ độ địa lý khác nhau.`
    },
    {
      id: "vl12-b15",
      lessonNumber: 15,
      title: "Bài 15: Lực Lorentz",
      chapter: "Chương III: Từ trường",
      coreContent: `BÀI 15: LỰC LORENTZ
- Định nghĩa: Là lực từ tác dụng lên hạt mang điện chuyển động trong từ trường.
- Công thức: f_L = |q| * v * B * sin(alpha) (trong đó v là tốc độ hạt mang điện, B là cảm ứng từ, alpha là góc hợp bởi vectơ v và vectơ B).
- Quy tắc bàn tay trái: Đặt lòng bàn tay hứng đường sức từ, chiều từ cổ tay đến ngón tay dọc theo vectơ v. Nếu q dương thì ngón cái choãi 90 độ chỉ chiều f_L. Nếu q âm thì f_L hướng ngược chiều ngón cái.`
    },
    {
      id: "vl12-b16",
      lessonNumber: 16,
      title: "Bài 16: Từ thông. Hiện tượng cảm ứng điện từ",
      chapter: "Chương III: Từ trường",
      coreContent: `BÀI 16: TỪ THÔNG. HIỆN TƯỢNG CẢM ỨNG ĐIỆN TƯ
- Từ thông qua diện tích S đặt trong từ trường đều B: $\\Phi = B \\cdot S \\cdot \\cos\\alpha$.
- Hiện tượng cảm ứng điện từ: Khi từ thông qua mạch kín biến thiên, trong mạch xuất hiện một suất điện động cảm ứng $e_c$ sinh ra dòng điện cảm ứng $i_c$.
- Định luật Lenz: Dòng điện cảm ứng có chiều sao cho từ trường do nó sinh ra cản trở nguyên nhân sinh ra nó.
- Định luật Faraday về suất điện động cảm ứng: $e_c = -\\frac{\\Delta\\Phi}{\\Delta t}$.`
    },
    {
      id: "vl12-b17",
      lessonNumber: 17,
      title: "Bài 17: Tự cảm",
      chapter: "Chương III: Từ trường",
      coreContent: `BÀI 17: HIỆN TƯỢNG TỰ CẢM
- Hiện tượng tự cảm: Là hiện tượng cảm ứng điện từ xảy ra trong một mạch điện do sự biến thiên của chính cường độ dòng điện trong mạch đó sinh ra.
- Từ thông tự cảm xuyên qua cuộn dây có độ tự cảm L: $\\Phi = L \\cdot i$.
- Suất điện động tự cảm xuất hiện trong cuộn dây: $e_{tc} = -L \\cdot \\frac{\\Delta i}{\\Delta t}$. Đơn vị hằng số L: Henry (H).`
    },
    {
      id: "vl12-b18",
      lessonNumber: 18,
      title: "Bài 18: Máy phát điện xoay chiều. Điện áp xoay chiều",
      chapter: "Chương III: Từ trường",
      coreContent: `BÀI 18: MÁY PHÁT ĐIỆN XOAY CHIỀU. ĐIỆN ÁP XOAY CHIỀU
- Cấu tạo máy phát điện xoay chiều: Gồm phần cảm tạo từ trường (nam châm - rotor/stator) và phần ứng sinh suất điện động (cuộn dây).
- Nguyên lý hoạt động: Dựa trên hiện tượng cảm ứng điện từ khi rotor quay làm từ thông xuyên qua cuộn dây biến thiên tuần hoàn.
- Điện áp xoay chiều: $u = U_0 \\cdot \\cos(\\omega \\cdot t + \\phi)$. Hiệu dụng: $U = \\frac{U_0}{\\sqrt{2}}$.`
    },
    {
      id: "vl12-b19",
      lessonNumber: 19,
      title: "Bài 19: Điện từ trường. Sóng điện từ",
      chapter: "Chương III: Từ trường",
      coreContent: `BÀI 19: ĐIỆN TỪ TRƯỜNG. SÓNG ĐIỆN TỪ
- Điện từ trường (Thuyết Maxwell): Môi trường thống nhất gồm điện trường biến thiên sinh ra từ trường xoáy biến thiên tuần hoàn, và ngược lại từ trường biến thiên sinh ra điện trường xoáy.
- Lan truyền sóng điện từ: Có năng lượng, vận tốc trong chân không $c = 3 \\cdot 10^8\\text{ m/s}$. Sóng điện từ lan truyền ngang qua không khí và các điện môi, có đặc trưng giao thoa, nhiễu xạ, phản xạ.`
    },
    {
      id: "vl12-b20",
      lessonNumber: 20,
      title: "Bài 20: Cấu tạo hạt nhân. Độ hụt khối. Năng lượng liên kết",
      chapter: "Chương IV: Vật lí hạt nhân",
      coreContent: `BÀI 20: CẤU TẠO HẠT NHÂN. ĐỘ HỤT KHỐI. NĂNG LƯỢNG LIÊN KẾT
- Kí hiệu hạt nhân: $X(Z, A)$ với $Z$ là số Proton (nguyên tử số), $A$ là số khối (tổng Proton + Neutron).
- Đồng vị: Các hạt nhân cùng số $Z$ nhưng khác số $A$.
- Độ hụt khối $\\Delta m$: $\\Delta m = [Z \\cdot m_p + (A - Z) \\cdot m_n] - m_X$.
- Năng lượng liên kết: $E_{lk} = \\Delta m \\cdot c^2$.
- Năng lượng liên kết riêng: $E_{lkr} = \\frac{E_{lk}}{A}$. Đại lượng đặc trưng cho độ bền vững của hạt nhân (bền nhất với $A$ từ 50 đến 80).`
    },
    {
      id: "vl12-b21",
      lessonNumber: 21,
      title: "Bài 21: Phóng xạ alpha, beta, gamma. Định luật phóng xạ. Chu kì bán rã",
      chapter: "Chương IV: Vật lí hạt nhân",
      coreContent: `BÀI 21: HIỆN TƯỢNG PHÓNG XẠ
- Định nghĩa phóng xạ: Sự phân rã tự phát của một hạt nhân không bền vững chuyển đổi thành hạt nhân khác đồng thời phát ra các bức xạ alpha, beta, hoặc gamma.
- Định luật phóng xạ: $N(t) = N_0 \\cdot e^{-\\lambda \\cdot t} = N_0 \\cdot 2^{-t / T}$. Với $T$ là chu kì bán rã (thời gian để một nửa số hạt nhân bị phân rã).`
    },
    {
      id: "vl12-b22",
      lessonNumber: 22,
      title: "Bài 22: Phản ứng hạt nhân. Phản ứng phân hạch, phản ứng nhiệt hạch",
      chapter: "Chương IV: Vật lí hạt nhân",
      coreContent: `BÀI 22: PHẢN ỨNG HẠT NHÂN. PHÂN HẠCH VÀ NHIỆT HẠCH
- Phản ứng hạt nhân: Sự tương tác giữa hai hạt nhân hoặc sự phân rã của một hạt nhân không bền thành các hạt nhân khác. Tuân thủ định luật bảo toàn điện tích, số khối, động lượng và năng lượng toàn phần.
- Phản ứng phân hạch: Hạt nhân nặng (như U235) hấp thụ neutron chậm rồi vỡ thành 2 mảnh trung bình đồng thời giải phóng 2-3 neutron và năng lượng khổng lồ.
- Phản ứng nhiệt hạch: Hai hạt nhân rất nhẹ (như hydrogen) kết hợp thành hạt nhân nặng hơn ở nhiệt độ cực cao (hàng triệu độ C), giải phóng năng lượng lớn hơn phân hạch nhiều lần.`
    },
    {
      id: "vl12-b23",
      lessonNumber: 23,
      title: "Bài 23: Thực hành: Đo độ phóng xạ của nguồn phóng xạ tự nhiên bằng máy Geiger-Muller",
      chapter: "Chương IV: Vật lí hạt nhân",
      coreContent: `BÀI 23: THỰC HÀNH: ĐO ĐỘ PHÓNG XẠ TỰ NHIÊN BẰNG MÁY GEIGER-MULLER
- Nguyên lý: Ống đếm Geiger-Muller chứa khí trơ ở áp suất thấp hóa ion khi hạt bức xạ alpha, beta, hoặc gamma đi qua tạo xung điện thế.
- Đo độ phóng xạ: Đo số xung đếm được trong các khoảng thời gian khác nhau để ước lượng tốc độ phân rã tự nhiên. Rút ra lưu ý về bức xạ phông tự nhiên và cách bảo vệ khoảng cách vật lý an toàn chống tia phóng xạ.`
    },
    {
      id: "vl12-b24",
      lessonNumber: 24,
      title: "Bài 24: An toàn bức xạ và ứng dụng hạt nhân",
      chapter: "Chương IV: Vật lí hạt nhân",
      coreContent: `BÀI 24: AN TOÀN BỨC XẠ VÀ ỨNG DỤNG VẬT LÝ HẠT NHÂN
- Tác hại sinh học của bức xạ: Phá hủy DNA tế bào, gây đột biến gene, bỏng phóng xạ, ung thư.
- Ba nguyên tắc an toàn bức xạ: Giảm thời gian tiếp xúc (Time), Tăng khoảng cách tới nguồn (Distance), Sử dụng màn chắn bảo vệ thích hợp chì/bê tông (Shielding).
- Ứng dụng: Chẩn đoán điều trị y học (chụp PET, xạ trị ung thư), nông nghiệp (chiếu xạ bảo quản thực phẩm), sinh học đột biến định tuổi khảo cổ bằng đồng vị C14.`
    },
    {
      id: "vl12-b25",
      lessonNumber: 25,
      title: "Bài 25: Bài tập về vật lí hạt nhân",
      chapter: "Chương IV: Vật lí hạt nhân",
      coreContent: `BÀI 25: BÀI TẬP VỀ VẬT LÍ HẠT NHÂN
- Tính toán năng lượng liên kết và liên kết riêng của các đồng vị hạt nhân.
- Vận dụng định luật bảo toàn bảo điện tích, số nucleon để hoàn thành phản ứng hạt nhân.
- Vận dụng định luật phóng xạ tính số hạt còn lại, khối lượng phân rã, chu kì bán rã.`
    }
  ]
};

