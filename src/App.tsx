import React, { useState, useEffect, useRef } from "react";
import ReactMarkdown from "react-markdown";
import { 
  Sparkles, 
  FileText, 
  Settings, 
  Copy, 
  Check, 
  BookOpen, 
  HelpCircle, 
  Info,
  Layers, 
  Compass, 
  ArrowRight,
  ArrowLeft,
  RefreshCw,
  Award,
  AlertTriangle,
  Globe,
  Monitor,
  CheckCircle2,
  ListOrdered,
  FileDown,
  Sliders,
  Upload
} from "lucide-react";
import { SAMPLE_LESSONS, SampleLesson } from "./samples";
import { parseDocxFile, downloadIntegratedAsDoc } from "./utils/docxExporter";
import { KNTT_CURRICULUM } from "./data/knttCurriculum";

export default function App() {
  const [lessonPlan, setLessonPlan] = useState("");
  const [level, setLevel] = useState<"Vật lí 10" | "Vật lí 11" | "Vật lí 12">("Vật lí 10");
  const [subject, setSubject] = useState("");
  const [customApiKey, setCustomApiKey] = useState(() => {
    return localStorage.getItem("gemini_custom_api_key") || "";
  });
  const [selectedLessonId, setSelectedLessonId] = useState("");
  
  const [isLoading, setIsLoading] = useState(false);
  const [progressStep, setProgressStep] = useState(0);
  const [outputResult, setOutputResult] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState<"standard" | "frameworks" | "guide">("standard");

  // File upload states
  const [uploadedFileName, setUploadedFileName] = useState("");
  const [uploadedFileData, setUploadedFileData] = useState<{ base64: string; mimeType: string } | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Custom textbook curriculum override states and handles
  const [curriculum, setCurriculum] = useState<Record<string, Array<{id: string; lessonNumber: number; title: string; chapter: string; coreContent: string}>>>(() => {
    const saved = localStorage.getItem("custom_kntt_curriculum");
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error("Error reading saved custom curriculum:", e);
      }
    }
    return KNTT_CURRICULUM;
  });
  const [showCurriculumModal, setShowCurriculumModal] = useState(false);
  const [curriculumRawText, setCurriculumRawText] = useState("");
  const [isParsingCurriculum, setIsParsingCurriculum] = useState(false);
  const [parsingCurriculumError, setParsingCurriculumError] = useState("");
  const [parsingCurriculumSuccess, setParsingCurriculumSuccess] = useState(false);
  const curriculumFileRef = useRef<HTMLInputElement>(null);

  const handleParseTextbookCurriculum = async () => {
    if (!curriculumRawText.trim()) {
      setParsingCurriculumError("Vui lòng nhập văn bản mục lục hoặc tải lên tệp văn bản từ sách trước.");
      return;
    }
    setIsParsingCurriculum(true);
    setParsingCurriculumError("");
    setParsingCurriculumSuccess(false);

    try {
      const response = await fetch("/api/parse-curriculum", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          rawText: curriculumRawText,
          customApiKey: customApiKey
        })
      });

      if (!response.ok) {
        const errData = await response.json();
        throw new Error(errData.error || "Gặp sự cố kết nối máy chủ AI phân tích mục lục.");
      }

      const data = await response.json();
      if (data && Array.isArray(data.lessons)) {
        const newLessons = data.lessons.map((lesson: any, index: number) => ({
          id: `custom-${level.replace(/\s+/g, "").toLowerCase()}-${Date.now()}-${index}`,
          lessonNumber: lesson.lessonNumber || (index + 1),
          title: lesson.title || `Bài học ${index + 1}`,
          chapter: lesson.chapter || "Chương Tùy Chọn",
          coreContent: lesson.coreContent || ""
        }));

        const updatedCurriculum = {
          ...curriculum,
          [level]: newLessons
        };

        setCurriculum(updatedCurriculum);
        localStorage.setItem("custom_kntt_curriculum", JSON.stringify(updatedCurriculum));
        setParsingCurriculumSuccess(true);
        setSelectedLessonId(""); // reset selected grade lesson
        setCurriculumRawText(""); // clear parsed text area
      } else {
        throw new Error("Dữ liệu nhận về từ AI không đúng cấu trúc danh mục chứa mảng 'lessons'.");
      }
    } catch (err: any) {
      console.error(err);
      setParsingCurriculumError(err.message || "Quá trình phân học cấu trúc sách thất bại.");
    } finally {
      setIsParsingCurriculum(false);
    }
  };

  const handleResetCurriculumLevel = () => {
    const defaultState = KNTT_CURRICULUM[level] || [];
    const updatedCurriculum = {
      ...curriculum,
      [level]: defaultState
    };
    setCurriculum(updatedCurriculum);
    localStorage.setItem("custom_kntt_curriculum", JSON.stringify(updatedCurriculum));
    setSelectedLessonId("");
    setParsingCurriculumSuccess(true);
    setParsingCurriculumError("");
    setTimeout(() => setParsingCurriculumSuccess(false), 3000);
  };

  // Multi-step loader for realistic pedagogical processing
  const steps = [
    "Đang phân tích cấu trúc giáo án Vật lí nguồn lớp 10/11/12...",
    "Đang định dạng chuẩn hóa các đề mục theo Công văn 5512...",
    "Đang đối chiếu Khung năng lực số người học (Thông tư 02/2025/TT-BGDĐT)...",
    "Găm các tích hợp NLS phù hợp (Khai thác thông tin, Sáng tạo nội dung vật lí)...",
    "Đối chiếu khung giáo dục Trí tuệ nhân tạo (QĐ 3439/QĐ-BGDĐT)...",
    "Tích hợp các kĩ thuật AI, mô phỏng số (PhET, Matlab virtual, Algodoo)...",
    "Thiết lập lưu ý hành vi Đạo đức số & Đạo đức AI (Trung thực thực nghiệm)...",
    "Đang hoàn thành biên soạn và làm sạch mã LaTeX..."
  ];

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isLoading) {
      setProgressStep(0);
      interval = setInterval(() => {
        setProgressStep((prev) => {
          if (prev < steps.length - 1) {
            return prev + 1;
          }
          return prev;
        });
      }, 3500);
    }
    return () => clearInterval(interval);
  }, [isLoading]);

  // Load preset sample
  const handleLoadSample = (sample: SampleLesson) => {
    setLessonPlan(sample.content);
    setLevel(sample.level as "Vật lí 10" | "Vật lí 11" | "Vật lí 12");
    setSubject(sample.subject);
    setSelectedLessonId("");
    setErrorMsg("");
    setUploadedFileName("");
    setUploadedFileData(null);
  };

  // Process uploaded files (.docx, .txt, .pdf or images)
  const processUploadedFile = async (file: File) => {
    setErrorMsg("");
    const lowerName = file.name.toLowerCase();
    
    if (lowerName.endsWith(".txt")) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setLessonPlan(e.target?.result as string);
        setUploadedFileName(file.name);
        setUploadedFileData(null);
      };
      reader.readAsText(file);
    } else if (lowerName.endsWith(".docx")) {
      try {
        const text = await parseDocxFile(file);
        setLessonPlan(text);
        setUploadedFileName(file.name);
        setUploadedFileData(null);
      } catch (err) {
        console.error(err);
        setErrorMsg("Không thể đọc được dữ liệu từ tệp Word (.docx) này. Vui lòng đảm bảo tệp không bị lỗi.");
      }
    } else if (lowerName.endsWith(".pdf") || file.type === "application/pdf" || file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        const commaIndex = result.indexOf(",");
        const base64 = result.substring(commaIndex + 1);
        
        const mimeType = file.type || (lowerName.endsWith(".pdf") ? "application/pdf" : "image/jpeg");
        
        setUploadedFileData({
          base64,
          mimeType,
        });
        setUploadedFileName(file.name);
        setLessonPlan(`[TỆP HỌC LIỆU ĐÍNH KÈM: ${file.name}]
Hệ thống AI sẽ trực tiếp rà soát, OCR xử lý tệp tài liệu ${lowerName.endsWith(".pdf") ? "PDF Sách giáo khoa" : "Hình ảnh bài giảng"} này và BIÊN SOẠN TỪ ĐẦU cho Thầy Cô một Giáo án đạt chuẩn quy chuẩn Công văn 5512 tích hợp các hoạt động Năng lực số & năng lực AI sinh động!`);
      };
      reader.readAsDataURL(file);
    } else {
      setErrorMsg("Chỉ hỗ trợ tải lên tệp định dạng .docx, .txt, .pdf hoặc tệp ảnh vẽ đồ thị/bài học.");
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      processUploadedFile(file);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) {
      processUploadedFile(file);
    }
  };

  const handleClearFile = () => {
    setUploadedFileName("");
    setLessonPlan("");
    setUploadedFileData(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  // Word file downloader
  const handleDownloadDoc = () => {
    if (!outputResult) return;
    const documentTitle = subject ? `Giao_an_Vat_li_${level}_${subject}` : `Giao_an_${level}_Tich_Hop`;
    downloadIntegratedAsDoc(outputResult, documentTitle);
  };

  // Submit to analyze & integrate
  const handleIntegrate = async () => {
    if (!lessonPlan.trim() && !uploadedFileData) {
      setErrorMsg("Vui lòng nhập nội dung giáo án cũ, tải nhanh giáo án mẫu, hoặc đính kèm tệp PDF/Hình ảnh bài học.");
      return;
    }

    setIsLoading(true);
    setErrorMsg("");
    setOutputResult("");

    try {
      const response = await fetch("/api/integrate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          lessonPlan,
          level,
          subject,
          customApiKey,
          fileData: uploadedFileData,
        }),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || "Có lỗi từ máy chủ xảy ra.");
      }

      setOutputResult(data.output);
    } catch (err: any) {
      console.error(err);
      setErrorMsg(err.message || "Không thể kết nối đến máy chủ AI hoặc yêu cầu bị từ chối.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopy = () => {
    if (!outputResult) return;
    navigator.clipboard.writeText(outputResult);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 flex flex-col antialiased font-sans">
      {/* Decorative steel teal bar top */}
      <div className="h-1.5 bg-gradient-to-r from-teal-600 via-teal-700 to-emerald-700 w-full" />

      {/* Header component styled in elegant steel teal theme */}
      <header className="bg-white border-b border-slate-200 py-5 px-4 sm:px-6 shadow-sm sticky top-0 z-40 print:hidden">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-teal-50 rounded-xl flex items-center justify-center border border-teal-200 shadow-xs">
              <Sparkles className="w-6.5 h-6.5 text-teal-700" />
            </div>
            <div>
              <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900">
                TRỢ LÝ SƯ PHẠM SỐ: <span className="text-teal-700">CHUYỂN ĐỔI GIÁO ÁN VẬT LÍ (10, 11, 12)</span>
              </h1>
              <p className="text-xs text-slate-500 font-medium mt-0.5">
                Chuyên sâu môn Vật lí học thông đường • Công văn 5512 • Thông tư 02/2025/TT-BGDĐT • Quyết định 3439/QĐ-BGDĐT
              </p>
            </div>
          </div>
          
          <div className="flex items-center gap-3 w-full md:w-auto justify-end">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-teal-50 text-teal-700 border border-teal-200">
              <span className="w-2 h-2 rounded-full bg-teal-500 animate-ping"></span>
              GDPT 2018 Chuyên Sâu
            </span>
          </div>
        </div>
      </header>

      {/* Main Grid Workspace */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 grid grid-cols-1 lg:grid-cols-2 gap-6 relative">
        
        {/* Left Input panel */}
        <section className="flex flex-col gap-6 print:hidden">
          
          {/* Settings & Config Card */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-xs p-5 flex flex-col gap-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2">
                <Settings className="w-5 h-5 text-teal-700" />
                <h2 className="font-semibold text-slate-900 font-sans">Tham số Chương trình phổ thông mới (GDPT 2018)</h2>
              </div>
              <span className="text-xs text-teal-600 bg-teal-50 px-2 py-0.5 rounded-md font-medium">Cấp THPT</span>
            </div>

            {/* Level Selector - Specialized for Physics 10, 11, 12 */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-2 uppercase tracking-wider">
                Khung phân phối chương trình
              </label>
              <div className="grid grid-cols-3 gap-2">
                {(["Vật lí 10", "Vật lí 11", "Vật lí 12"] as const).map((lvl) => (
                  <button
                    key={lvl}
                    type="button"
                    onClick={() => {
                      setLevel(lvl);
                      setSelectedLessonId("");
                    }}
                    className={`py-3 px-3 rounded-xl border text-xs font-medium cursor-pointer transition-all duration-200 text-center flex flex-col gap-0.5 items-center justify-center
                      ${level === lvl 
                        ? "bg-teal-50 border-teal-600 text-teal-800 shadow-xs ring-1 ring-teal-600/30 font-semibold" 
                        : "bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                      }`}
                  >
                    <span>{lvl}</span>
                    <span className="text-[10px] font-normal opacity-75">
                      {lvl === "Vật lí 10" && "Động học & Động lực học"}
                      {lvl === "Vật lí 11" && "Sóng, Điện field & Dòng điện"}
                      {lvl === "Vật lí 12" && "Chất khí, Nhiệt học & Vi mô"}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* KNTT Curriculum Dropdown */}
            <div className="bg-teal-50/50 border border-teal-100 rounded-xl p-3.5">
              <div className="flex items-center justify-between mb-1.5 gap-2">
                <label className="block text-xs font-bold text-teal-900 uppercase tracking-wider">
                  📖 Chọn bài học từ danh mục SGK ({level})
                </label>
                <button
                  type="button"
                  onClick={() => {
                    setCurriculumRawText("");
                    setParsingCurriculumError("");
                    setParsingCurriculumSuccess(false);
                    setShowCurriculumModal(true);
                  }}
                  className="inline-flex items-center gap-1 text-[10px] font-bold text-teal-800 bg-teal-100 hover:bg-teal-200 px-2.5 py-1 rounded-lg transition shrink-0 shadow-xs"
                >
                  <Upload className="w-3 h-3" />
                  <span>Nạp/Tùy chỉnh SGK</span>
                </button>
              </div>
              <p className="text-[11px] text-slate-600 mb-2 leading-relaxed">
                Khi chọn, hệ thống sẽ tự động nạp phân khúc kiến thức, biểu thức chuẩn của bài học này mà không cần tải lên PDF.
              </p>
              <select
                value={selectedLessonId}
                onChange={(e) => {
                  const val = e.target.value;
                  setSelectedLessonId(val);
                  if (val) {
                    const lessons = curriculum[level] || [];
                    const found = lessons.find(l => l.id === val);
                    if (found) {
                      setSubject(found.title.split(": ")[1] || found.title);
                      setLessonPlan(found.coreContent);
                      // Clear files
                      setUploadedFileName("");
                      setUploadedFileData(null);
                      setErrorMsg("");
                    }
                  }
                }}
                className="w-full text-xs rounded-lg border border-slate-200 px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-teal-600 focus:border-teal-600 font-medium transition cursor-pointer text-slate-800 shadow-inner"
              >
                <option value="">--- Click để chọn bài học phù hợp ---</option>
                {[...(curriculum[level] || [])].sort((a, b) => a.lessonNumber - b.lessonNumber).map((lesson) => (
                  <option key={lesson.id} value={lesson.id}>
                    {lesson.chapter} - {lesson.title}
                  </option>
                ))}
              </select>
              {selectedLessonId && (
                <div className="mt-2 bg-emerald-50 border border-emerald-200 text-emerald-950 text-[11px] rounded-lg p-2.5 flex items-center gap-2">
                  <span className="text-emerald-500 font-bold text-xs">✓</span>
                  <span>Đã nạp <strong>Kiến thức cốt lõi & Biểu thức Chuẩn</strong> của bài học được cấu hình từ SGK!</span>
                </div>
              )}
            </div>

            {/* Subject and API Key inline details */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1 uppercase tracking-wider">
                  Chủ đề bài học (Tự chọn)
                </label>
                <input
                  type="text"
                  placeholder="Ví dụ: Động lượng, Cảm ứng từ..."
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  className="w-full text-xs rounded-lg border border-slate-200 px-3 py-2 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-teal-600 focus:border-teal-600 transition"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1 uppercase tracking-wider">
                  API Key Gemini cá nhân (Tùy chọn)
                </label>
                <input
                  type="password"
                  placeholder="Để trống nếu sử dụng khóa hệ thống..."
                  value={customApiKey}
                  onChange={(e) => {
                    const val = e.target.value;
                    setCustomApiKey(val);
                    localStorage.setItem("gemini_custom_api_key", val);
                  }}
                  className="w-full text-xs rounded-lg border border-slate-200 px-3 py-2 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-teal-600 focus:border-teal-600 transition"
                />
              </div>
            </div>

            <p className="text-[11px] text-slate-500 leading-relaxed bg-slate-50 p-2.5 rounded-lg border border-slate-100">
              💡 <span className="font-semibold text-teal-800">Phương pháp luận chất lượng cao:</span> Với cấp phổ thông chất lượng cao THPT, học sinh được tiếp cận Trí tuệ Nhân tạo thông qua lý tưởng phản biện, phân tích ý nghĩa mô phỏng số, tìm tòi khoa học gắn đạo đức AI nhằm giảm bớt sự lệ thuộc triệt để vào văn bản tạo sẵn.
            </p>
          </div>

          {/* Quick presets list - Loaded from physical specimens */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-xs p-5 flex flex-col gap-3">
            <div className="flex items-center gap-2 justify-between">
              <div className="flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-teal-700" />
                <h2 className="font-semibold text-slate-900 font-sans">Tập giáo án gốc mẫu (GDPT 2018)</h2>
              </div>
              <span className="text-[10px] text-slate-400 text-right bg-slate-100 px-2 py-0.5 rounded">Vật lí 10,11,12 đại diện</span>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
              {SAMPLE_LESSONS.map((sample) => (
                <button
                  key={sample.id}
                  onClick={() => handleLoadSample(sample)}
                  type="button"
                  className="p-3 text-left border border-slate-200 rounded-xl hover:bg-teal-50/50 hover:border-teal-300 transition-all cursor-pointer group flex flex-col gap-1.5 bg-slate-50/20"
                >
                  <p className="text-xs font-bold text-teal-950 line-clamp-1 group-hover:text-teal-700 transition">
                    {sample.title}
                  </p>
                  <div className="flex justify-between items-center text-[10px] text-slate-500 mt-1">
                    <span className="bg-teal-50 text-teal-800 border border-teal-105 px-1.5 py-0.2 rounded font-medium">
                      {sample.level}
                    </span>
                    <span className="font-semibold text-teal-700 group-hover:translate-x-0.5 transition-transform">
                      Nạp mẫu →
                    </span>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Core Lesson Plan Paste Zone */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-xs p-5 flex-1 flex flex-col min-h-[420px]">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3 mb-3">
              <div className="flex items-center gap-2">
                <FileText className="w-5 h-5 text-teal-700" />
                <h2 className="font-semibold text-slate-900 font-sans">Nội dung văn bản giáo án gốc cần tích hợp</h2>
              </div>
              <div className="text-xs text-slate-400 font-mono">
                {lessonPlan.length > 0 ? `${lessonPlan.split(/\s+/).filter(Boolean).length} từ` : "Đợi nhập liệu ..."}
              </div>
            </div>

            {/* File Upload / Drag Zone */}
            <div 
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current?.click()}
              className={`border border-dashed rounded-xl p-4 text-center cursor-pointer transition-all duration-200 mb-3 flex flex-col items-center justify-center gap-1.5 select-none
                ${isDragging 
                  ? "border-teal-600 bg-teal-50/70" 
                  : uploadedFileName 
                    ? "border-emerald-500 bg-emerald-50/30 hover:bg-emerald-50/50" 
                    : "border-slate-300 bg-slate-50/50 hover:bg-slate-50 hover:border-teal-500"
                }`}
            >
              <input 
                type="file" 
                ref={fileInputRef}
                onChange={handleFileChange}
                accept=".docx,.txt,.pdf,image/*"
                className="hidden"
              />
              
              {uploadedFileName ? (
                <div className="flex flex-col items-center gap-1 w-full" onClick={(e) => e.stopPropagation()}>
                  <div className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-200 shadow-2xs">
                    <Check className="w-4 h-4" />
                  </div>
                  <p className="text-xs font-semibold text-emerald-950 line-clamp-1 max-w-xs">{uploadedFileName}</p>
                  <p className="text-[10px] text-slate-500 leading-normal">
                    Đã nạp nội dung hoàn thành! Bạn có thể chỉnh sửa văn bản trực tiếp bên dưới nếu cần thiết.
                  </p>
                  <button 
                    type="button" 
                    onClick={handleClearFile}
                    className="text-[10px] font-bold text-red-650 hover:text-red-800 transition cursor-pointer underline mt-1"
                  >
                    Xóa và nhập lại tệp
                  </button>
                </div>
              ) : (
                <>
                  <div className="w-9 h-9 bg-teal-50 rounded-lg flex items-center justify-center border border-teal-200">
                    <Upload className="w-5 h-5 text-teal-800" />
                  </div>
                  <div className="flex flex-col items-center">
                    <p className="text-xs font-bold text-slate-800">Tải Giáo án hoặc Sách giáo khoa (.docx, .txt, .pdf, ảnh)</p>
                    <p className="text-[10px] text-slate-500 mt-0.5">Click chọn hoặc kéo thả giáo án cũ hoặc ảnh/PDF trang bài học SGK vào đây</p>
                    <p className="text-[9.5px] text-teal-850 mt-2 font-semibold bg-teal-50 px-2.5 py-1 rounded-md border border-teal-100 select-none max-w-md text-center leading-normal">
                      💡 Mẹo hữu ích: Nếu tệp sách giáo khoa (.pdf) quá lớn, Thầy/Cô hãy Mở tệp, SAO CHÉP (COPY) TRỰC TIẾP văn bản trong trang rồi dán vào khung dưới cấu trúc 5512. AI sẽ đọc lập tức tránh hoàn toàn quá tải!
                    </p>
                  </div>
                </>
              )}
            </div>

            <textarea
              value={lessonPlan}
              onChange={(e) => setLessonPlan(e.target.value)}
              placeholder="Dán toàn bộ giáo án Vật lí cũ chưa tích hợp của bạn vào đây (bao gồm Mục tiêu, Thiết bị dạy học, các hoạt động học của tiến trình 5512: Khởi động, Hình thành kiến thức, Luyện tập, Vận dụng).

Sau đó chọn phân phối khối lớp tương ứng phía trên và bấm 'Bắt đầu Chuyển đổi và Tích hợp'..."
              className="w-full flex-1 min-h-[220px] text-xs font-mono rounded-xl border border-slate-200 p-4 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-teal-600 focus:border-teal-600 transition resize-none leading-relaxed"
            />

            <div className="mt-4 flex flex-col gap-3">
              {/* Warnings and solid physics constraints */}
              <div className="text-[11px] text-slate-600 space-y-1.5 bg-teal-50/70 p-3.5 rounded-xl border border-teal-100">
                <p className="font-bold text-teal-900 flex items-center gap-1">
                  ⚠️ Nguyên tắc vàng cam kết chất lượng Vật lí học quốc gia:
                </p>
                <p>• <span className="font-semibold">Bắt buộc giữ nguyên giáo án gốc:</span> Không tóm tắt hay lược bỏ nội dung cốt lõi của giáo viên, không làm thay đổi thứ tự tiến trình dạy học của bài giảng.</p>
                <p>• <span className="font-semibold">Tích hợp thực chất:</span> Chèn đúng năng lực số và kỹ thuật trí tuệ nhân tạo (máy tính, phần mềm, mô phỏng số) gắn chặt vào hành vi thao tác của học sinh để giải quyết vấn đề vật lí thật.</p>
                <p>• <span className="font-semibold">Chống lệ thuộc AI:</span> Bắt buộc học sinh đối chiếu kết quả phản hồi của AI với sách giáo khoa phổ thông mới hoặc tài liệu khoa học chính quy.</p>
              </div>

              {errorMsg && (
                <div className="bg-rose-50 border border-rose-200 rounded-xl p-3 flex items-start gap-2.5 text-rose-800 text-xs">
                  <AlertTriangle className="w-4.5 h-4.5 text-rose-600 shrink-0 mt-0.5" />
                  <p>{errorMsg}</p>
                </div>
              )}

              <button
                onClick={handleIntegrate}
                disabled={isLoading}
                className="w-full bg-teal-800 hover:bg-teal-900 text-white font-bold py-3 px-4 rounded-xl shadow-md cursor-pointer disabled:opacity-50 transition-all flex items-center justify-center gap-2 text-sm select-none"
              >
                {isLoading ? (
                  <>
                    <RefreshCw className="w-5 h-5 animate-spin" />
                    <span>Đang rà soát và tích hợp quy chuẩn sư phạm số...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-5 h-5" />
                    <span>Tiến hành Chuyển đổi và Tích hợp Năng lực số / AI</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Reference panel */}
          <div className="bg-slate-200 rounded-2xl p-0.5 overflow-hidden">
            <div className="bg-slate-100 px-3 py-2 flex items-center gap-2 border-b border-slate-200">
              <Sliders className="w-4.5 h-4.5 text-teal-800" />
              <span className="text-xs font-bold text-slate-700 uppercase tracking-wider">Bộ Công cụ Công nghệ Vật lí Đề xuất</span>
            </div>
            <div className="bg-white p-4 space-y-3 text-xs text-slate-600">
              <p className="leading-relaxed">
                Khi thực hiện chuyển đổi, các công cụ số chuyên ngành Vật lí thường được Trợ lý AI tích hợp linh hoạt gồm:
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div className="bg-slate-50 p-2.5 rounded-lg border border-slate-200">
                  <span className="font-bold text-teal-800 block mb-1">Mô phỏng ảo chất lượng cao</span>
                  Hệ mô phỏng PhET (Đại học Colorado), phần mềm thí nghiệm ảo cơ học Algodoo, các trang web mô phỏng tương tác tĩnh điện và quang học trực quan.
                </div>
                <div className="bg-slate-50 p-2.5 rounded-lg border border-slate-200">
                  <span className="font-bold text-teal-800 block mb-1">Công cụ đo lường và AI</span>
                  Ứng dụng Phyphox đo đạc gia tốc/tần số qua cảm biến điện thoại, cảm biến cổng quang học, AI tạo sinh để tương tác phản biện prompt học thuật.
                </div>
              </div>
            </div>
          </div>

        </section>

        {/* Right Output panel */}
        <section className="bg-white rounded-2xl border border-slate-200 shadow-md flex flex-col overflow-hidden min-h-[500px]">
          
          <div className="bg-slate-900 text-white p-4 flex flex-col sm:flex-row items-center justify-between gap-3 sticky top-0 z-10 print:hidden border-b border-teal-950">
            <div className="flex items-center gap-2">
              <span className="flex h-2.5 w-2.5 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-teal-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-teal-500"></span>
              </span>
              <div>
                <h3 className="font-bold text-xs uppercase tracking-widest text-teal-300">Công cụ Đầu ra Giáo án tích hợp</h3>
                <p className="text-[10px] text-slate-400">Xuất lại văn bản hoàn chỉnh 100% tiếng Việt</p>
              </div>
            </div>

            <div className="flex items-center gap-1.5 w-full sm:w-auto justify-end flex-wrap">
              {outputResult && (
                <>
                  <button 
                    onClick={handleDownloadDoc}
                    className="flex items-center gap-1.5 px-3 py-1.5 bg-teal-700 hover:bg-teal-600 text-white rounded-lg text-xs font-bold transition cursor-pointer select-none border border-teal-650 shadow-sm"
                    title="Tải tệp giáo án Word về máy"
                  >
                    <FileDown className="w-4 h-4" />
                    <span>Tải tệp Word (.docx)</span>
                  </button>
                  <button 
                    onClick={handleCopy}
                    className="flex items-center gap-1 px-3 py-1.5 bg-slate-800 hover:bg-slate-755 text-white hover:text-teal-300 rounded-lg text-xs font-semibold border border-slate-700 transition cursor-pointer select-none"
                    title="Sao chép toàn bộ"
                  >
                    {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copied ? "Đã sao chép!" : "Sao chép"}</span>
                  </button>
                </>
              )}
            </div>
          </div>

          {/* Navigation tabs inside Output component wrapper */}
          <div className="bg-slate-100 px-4 py-2 border-b border-slate-200 flex flex-wrap gap-2 items-center justify-between print:hidden">
            <div className="flex gap-1.5">
              <button
                onClick={() => setActiveTab("standard")}
                className={`px-3 py-1 text-xs rounded-md transition font-medium cursor-pointer ${
                  activeTab === "standard" 
                    ? "bg-white text-teal-800 shadow-sm border border-slate-200" 
                    : "text-slate-500 hover:bg-slate-200"
                }`}
              >
                Giáo án Vật lí tích hợp hoàn chỉnh
              </button>
              <button
                onClick={() => setActiveTab("frameworks")}
                className={`px-3 py-1 text-xs rounded-md transition font-medium cursor-pointer ${
                  activeTab === "frameworks" 
                    ? "bg-white text-teal-800 shadow-sm border border-slate-200" 
                    : "text-slate-500 hover:bg-slate-200"
                }`}
              >
                Khung mã năng lực số & AI
              </button>
              <button
                onClick={() => setActiveTab("guide")}
                className={`px-3 py-1 text-xs rounded-md transition font-medium cursor-pointer ${
                  activeTab === "guide" 
                    ? "bg-white text-teal-800 shadow-sm border border-slate-200" 
                    : "text-slate-500 hover:bg-slate-200"
                }`}
              >
                Hướng dẫn xuất ra Word / Google Docs
              </button>
            </div>
          </div>

          {/* Render Area */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-6 bg-white min-h-[460px] relative">
            
            {/* If Loading Indicator */}
            {isLoading && (
              <div className="absolute inset-0 bg-white/95 backdrop-blur-xs flex flex-col justify-center items-center p-8 z-20 text-center animate-fade-in">
                <div className="w-16 h-16 bg-teal-50 rounded-full flex items-center justify-center border-2 border-teal-200 animate-spin mb-4">
                  <RefreshCw className="w-8 h-8 text-teal-700" />
                </div>
                
                <h4 className="font-bold text-slate-800 text-sm mb-1.5 font-sans uppercase">
                  ĐANG BIÊN SOẠN GIÁO ÁN VẬT LÍ SỐ & AI CHẤT LƯỢNG CAO...
                </h4>
                
                <div className="text-xs text-teal-800 font-bold max-w-sm mb-4 h-12 flex items-center justify-center animate-pulse">
                  {steps[progressStep]}
                </div>

                <div className="w-full max-w-xs bg-slate-200 rounded-full h-1.5 mb-2 overflow-hidden">
                  <div 
                    className="bg-teal-700 h-1.5 rounded-full transition-all duration-700"
                    style={{ width: `${((progressStep + 1) / steps.length) * 100}%` }}
                  />
                </div>
                <div className="text-[10px] text-slate-400">
                  Phép toán xử lý vật lý sâu sắc mất khoảng 15 giây phục vụ độ chính xác cực đại.
                </div>
              </div>
            )}

            {/* Render results */}
            {outputResult ? (
              <div>
                {activeTab === "standard" && (
                  <div className="markdown-body select-text print:p-0">
                    <ReactMarkdown
                      components={{
                        strong: ({ children }) => {
                          const text = String(children);
                          const isSpecial = 
                            text.includes("🔴") || 
                            text.includes("🔎") || 
                            text.includes("Tích hợp") || 
                            text.includes("Giáo viên hướng dẫn") || 
                            text.includes("Học sinh thực hiện") || 
                            text.includes("Sản phẩm") || 
                            text.includes("Đánh giá");
                          if (isSpecial) {
                            return <strong className="text-rose-700 font-bold font-sans">{children}</strong>;
                          }
                          return <strong className="text-teal-800 font-bold">{children}</strong>;
                        }
                      }}
                    >
                      {outputResult}
                    </ReactMarkdown>
                  </div>
                )}
                
                {activeTab === "frameworks" && (
                  <div className="space-y-4">
                    <div className="p-4 bg-teal-50 border border-teal-200 rounded-xl">
                      <h4 className="font-bold text-teal-950 text-xs uppercase mb-1 flex items-center gap-1.5">
                        <Award className="w-4 h-4 text-teal-800" /> Ý nghĩa các nhãn tích hợp găm trong giáo án Vật lí
                      </h4>
                      <p className="text-xs text-teal-800 leading-relaxed">
                        Hệ thống đã phân tích chuyên môn và chèn trực tiếp các mã năng lực tương ứng cho học sinh THPT:
                      </p>
                    </div>

                    <div className="grid grid-cols-1 gap-3 text-xs">
                      <div className="p-3 border border-slate-200 rounded-xl bg-slate-50">
                        <span className="font-bold text-teal-800">🔴 MIỀN NLS 1 (Khai thác thông tin):</span> Học sinh tìm kiếm, thu thập, sàng lọc số liệu thực nghiệm từ internet hoặc phần mềm mô phỏng, biết tinh chỉnh tính chính xác và loại bỏ nhiễu lỗi.
                      </div>
                      <div className="p-3 border border-slate-200 rounded-xl bg-slate-50">
                        <span className="font-bold text-teal-800">🔴 MIỀN NLS 2 (Cộng tác học tập số):</span> Thảo luận khoa học trực tuyến thông qua bảng cộng tác số (Padlet, Google Slides, MS OneNote).
                      </div>
                      <div className="p-3 border border-slate-200 rounded-xl bg-slate-50">
                        <span className="font-bold text-teal-800">🔴 MIỀN NLS 3 (Sáng tạo nội dung vật lí):</span> Thiết kế sơ đồ khái niệm vật lí, lập bảng thu thập số liệu trên Excel/Sheets giải phương trình chuyển động, làm video học thuật.
                      </div>
                      <div className="p-3 border border-slate-200 rounded-xl bg-slate-50">
                        <span className="font-bold text-rose-700">🔴 MIỀN AI - NLa (Nhân văn, lấy con người làm gốc):</span> Phản biện giới hạn của mô hình toán học từ AI, nhận thức được trí tuệ con người kiểm chứng các định luật phổ quát.
                      </div>
                      <div className="p-3 border border-slate-200 rounded-xl bg-slate-50">
                        <span className="font-bold text-rose-700">🔴 MIỀN AI - NLb (Đạo đức học thuật):</span> Trích dẫn cụ thể AI hỗ trợ giải tích phân/vi phân hoặc sơ đồ thuật toán, trung thực khi nhập số liệu thí nghiệm thật, không bịa đặt số liệu.
                      </div>
                      <div className="p-3 border border-slate-200 rounded-xl bg-slate-50">
                        <span className="font-bold text-rose-700">🔴 MIỀN AI - NLc (Kĩ thuật ứng dụng AI):</span> Tạo hiệu quả các chuỗi prompt tính toán động năng, thế năng, cường độ điện trường hoặc phân tích phổ hạt vi mô.
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === "guide" && (
                  <div className="space-y-4">
                    <div className="p-5 border border-slate-200 rounded-xl bg-slate-50 space-y-3">
                      <h4 className="font-bold text-teal-800 flex items-center gap-1">
                        <FileDown className="w-5 h-5 text-teal-600" />
                        HƯỚNG DẪN XUẤT SANG MS WORD / GOOGLE DOCS SẠCH ĐẸP 
                      </h4>
                      <p className="text-xs text-slate-600 leading-relaxed">
                        Hãy làm theo quy trình đơn giản sau để lưu trữ giáo án đã tích hợp phục vụ lưu trữ, chuyển duyệt tổ chuyên môn nhanh chóng:
                      </p>

                      <ol className="text-xs text-slate-700 space-y-3 list-none pl-0">
                        <li className="flex items-start gap-2.5">
                          <span className="w-5 h-5 bg-teal-100 text-teal-950 rounded-full flex items-center justify-center text-[10px] font-bold shrink-0 mt-0.5">1</span>
                          <span>Bấm nút <span className="font-bold text-teal-900 border border-slate-300 px-2 py-0.5 bg-white rounded text-[10px] shadow-2xs">Sao chép</span> màu xám ở cụm công cụ tiêu đề góc trên bên phải màn hình.</span>
                        </li>
                        <li className="flex items-start gap-2.5">
                          <span className="w-5 h-5 bg-teal-100 text-teal-950 rounded-full flex items-center justify-center text-[10px] font-bold shrink-0 mt-0.5">2</span>
                          <span>Truy cập nhanh <span className="font-semibold text-teal-700 underline">Google Docs (docs.google.com)</span> hoặc bật phần mềm <span className="font-bold text-slate-900">Microsoft Word</span> trên laptop của bạn.</span>
                        </li>
                        <li className="flex items-start gap-2.5">
                          <span className="w-5 h-5 bg-teal-100 text-teal-955 rounded-full flex items-center justify-center text-[10px] font-bold shrink-0 mt-0.5">3</span>
                          <span>Tạo một văn bản trống mới, nhấp chuột phải và lựa chọn <span className="font-bold text-teal-900">Paste (Dán - Ctrl+V)</span>. Google Docs/MS Word sẽ phân phối các tiêu đề chuẩn, danh sách gạch đầu dòng, các công thức LaTeX, bảng dữ liệu hoạt động thành trang in chuẩn quy chế Công văn 5512 cực đẹp.</span>
                        </li>
                        <li className="flex items-start gap-2.5">
                          <span className="w-5 h-5 bg-teal-100 text-teal-950 rounded-full flex items-center justify-center text-[10px] font-bold shrink-0 mt-0.5">4</span>
                          <span>Tại Google Docs, chọn <span className="font-bold text-slate-800">File (Tệp)</span> → <span className="font-bold text-slate-800">Download (Tải xuống)</span> → lực chọn xuất đuôi <span className="font-bold text-teal-700 font-mono">Microsoft Word (.docx)</span>.</span>
                        </li>
                      </ol>

                      <div className="p-3 bg-teal-50 border border-teal-200/50 rounded-lg text-teal-800 text-[11px] leading-relaxed">
                        📌 <span className="font-bold">Mẹo hay cho người dự giờ:</span> Biểu tượng <span className="text-rose-700 font-bold">🔴 [Tích hợp NLS & AI]</span> đỏ rực khi in ra sẽ lập tức làm nổi rõ các đóng góp đổi mới phương pháp giảng dạy hiện đại của bạn, nhận được đánh giá rất cao từ tổ giám sát trường.
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              /* If empty of results state: show a welcome card with detailed layout to help first-time users */
              <div className="flex flex-col justify-center items-center h-full text-slate-400 py-12 px-6">
                <div className="w-16 h-16 bg-slate-100 rounded-2xl flex items-center justify-center mb-4 border border-slate-200">
                  <Compass className="w-8 h-8 text-teal-700 animate-pulse" />
                </div>
                <h3 className="text-slate-800 font-bold mb-1 max-w-xs text-center font-sans text-sm">
                  Chưa có kết quả giáo án tích hợp
                </h3>
                <p className="text-xs text-slate-500 text-center max-w-sm leading-relaxed mb-6">
                  Hãy dán nội dung giáo án Vật lí cũ của bạn vào khung văn bản bên trái, hoặc bấm trải nghiệm nhanh các giáo án mẫu Vật lí 10/11/12 của chương trình GDPT 2018.
                </p>

                <div className="w-full max-w-sm grid grid-cols-1 gap-2.5 mt-2 bg-slate-50 p-4 rounded-xl border border-dashed border-slate-300 shadow-xs">
                  <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest text-center mb-1">Mục tiêu chuẩn đầu ra Vật lí số</span>
                  
                  <div className="flex items-center gap-2 text-slate-600 text-xs">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Lập bảng định hướng tích hợp Phần 1 chuẩn quy chế</span>
                  </div>
                  
                  <div className="flex items-center gap-2 text-slate-600 text-xs">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Giữ nguyên nội dung thực nghiệm và bảng biểu Vật lí</span>
                  </div>

                  <div className="flex items-center gap-2 text-slate-600 text-xs">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Gài biểu tượng 🔴 chỉ rõ học sinh thao tác mô phỏng ảo</span>
                  </div>
                </div>
              </div>
            )}

          </div>

          {/* Footer details */}
          {outputResult && (
            <div className="bg-slate-50 px-4 py-3 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between text-[11px] text-slate-500 gap-2 print:hidden">
              <span>Hỗ trợ hiển thị công thức LaTeX mượt mà</span>
              <span className="font-semibold text-teal-800 bg-teal-50 px-2 py-0.5 rounded border border-teal-150">
                Chuyên sâu Vật lí 10, 11, 12 GDPT 2018
              </span>
            </div>
          )}

        </section>

      </main>

      {/* Textbook Curriculum Customizer Modal */}
      {showCurriculumModal && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 z-50 animate-fade-in">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-2xl max-w-2xl w-full max-h-[90vh] flex flex-col overflow-hidden animate-scale-up">
            
            {/* Modal Header */}
            <div className="bg-teal-700 text-white p-5 flex items-center justify-between shrink-0">
              <div className="flex items-center gap-2.5">
                <BookOpen className="w-5.5 h-5.5" />
                <div>
                  <h3 className="font-bold text-base">Tải lên & Tùy chỉnh danh mục SGK ({level})</h3>
                  <p className="text-teal-100 text-xs">Phục vụ điều chỉnh bài học cho bộ sách của trường/lớp</p>
                </div>
              </div>
              <button 
                onClick={() => setShowCurriculumModal(false)}
                className="text-white hover:bg-white/10 w-8 h-8 rounded-full flex items-center justify-center transition"
              >
                ✕
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-5 flex-1 overflow-y-auto space-y-5">
              
              {/* Note / Instruction */}
              <div className="bg-amber-50 border border-amber-200 text-amber-950 text-xs rounded-xl p-3 flex gap-2.5 leading-relaxed">
                <Info className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                <div className="space-y-1">
                  <p className="font-bold">Mẹo sao chép/dán mục lục hiệu quả:</p>
                  <p>Để có kết quả tốt nhất, Thầy/Cô hãy <strong>mở tài liệu PDF/Word của sách hoặc đề cương</strong>, <strong>sao chép (COPY) đoạn mục lục các bài dạy</strong> rồi dán thẳng vào khung dưới đây. AI sẽ tự động định danh tiêu đề, chương và thiết kế tóm tắt kiến thức cốt lõi cho Thầy/Cô!</p>
                </div>
              </div>

              {/* Upload Input Area */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wide">
                    Dán mục lục hay tiêu đề các bài học của bộ sách:
                  </label>
                  
                  {/* Small file selector tool */}
                  <div className="flex items-center gap-2">
                    <input 
                      type="file"
                      ref={curriculumFileRef}
                      accept=".txt,.docx"
                      onChange={async (e) => {
                        const file = e.target.files?.[0];
                        if (file) {
                          try {
                            if (file.name.endsWith(".txt")) {
                              const r = new FileReader();
                              r.onload = (evt) => {
                                setCurriculumRawText(evt.target?.result as string || "");
                              };
                              r.readAsText(file);
                            } else if (file.name.endsWith(".docx")) {
                              const t = await parseDocxFile(file);
                              setCurriculumRawText(t);
                            } else {
                              alert("Vui lòng tải tệp .txt hoặc .docx");
                            }
                          } catch (err) {
                            console.error(err);
                            alert("Không thể đọc tệp này. Hãy dùng phương pháp dán văn bản trực tiếp.");
                          }
                        }
                      }}
                      className="hidden"
                    />
                    <button
                      type="button"
                      onClick={() => curriculumFileRef.current?.click()}
                      className="inline-flex items-center gap-1 text-[11px] font-semibold text-slate-600 hover:text-teal-700 bg-slate-100 hover:bg-teal-50 px-2 py-1 rounded transition border border-slate-200 cursor-pointer"
                    >
                      <Upload className="w-3.5 h-3.5" />
                      Chọn file TXT/DOCX
                    </button>
                  </div>
                </div>

                <textarea
                  placeholder="Ví dụ dán: 
Chương I. Vật lí nhiệt
Bài 1. Cấu trúc của chất. Sự chuyển thể
Chương II. Khí lí tưởng
Bài 8. Mô hình động học phân tử chất khí..."
                  rows={6}
                  value={curriculumRawText}
                  onChange={(e) => setCurriculumRawText(e.target.value)}
                  className="w-full text-xs rounded-xl border border-slate-200 p-3.5 focus:outline-none focus:ring-2 focus:ring-teal-600 focus:border-teal-600 font-mono shadow-inner bg-slate-50/50 text-slate-850"
                />
              </div>

              {/* Status and Actions for parsing */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
                <button
                  type="button"
                  onClick={handleParseTextbookCurriculum}
                  disabled={isParsingCurriculum || !curriculumRawText.trim()}
                  className="inline-flex items-center justify-center gap-2 px-4 py-2 bg-teal-600 hover:bg-teal-700 disabled:bg-slate-300 disabled:cursor-not-allowed text-white text-xs font-bold rounded-lg transition shadow-md shrink-0 cursor-pointer"
                >
                  {isParsingCurriculum ? (
                    <>
                      <RefreshCw className="w-4 h-4 animate-spin" />
                      <span>AI đang phân tích & trích suất...</span>
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-4 h-4" />
                      <span>Phân tích bằng AI để nạp Dropdown</span>
                    </>
                  )}
                </button>

                <button
                  type="button"
                  onClick={handleResetCurriculumLevel}
                  className="text-xs font-bold text-slate-500 hover:text-rose-605 underline cursor-pointer text-left sm:text-right"
                >
                  Đặt lại về mục lục mặc định KNTT
                </button>
              </div>

              {parsingCurriculumError && (
                <div className="bg-rose-50 border border-rose-200 text-rose-950 p-3 rounded-lg text-xs leading-relaxed flex gap-2">
                  <AlertTriangle className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
                  <span>{parsingCurriculumError}</span>
                </div>
              )}

              {parsingCurriculumSuccess && (
                <div className="bg-emerald-50 border border-emerald-250 text-emerald-950 p-3.5 rounded-lg text-xs leading-relaxed flex gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>Cập nhật danh mục sách thành công! Danh mục sổ xuống ngoài màn hình chính đã được làm mới. Thầy/Cô hãy chọn bài học và trải nghiệm.</span>
                </div>
              )}

              {/* Current listings preview */}
              <div className="space-y-2">
                <span className="block text-xs font-bold text-slate-700 uppercase tracking-wide">
                  Đang hiển thị mục lục hiện hành của ({level} - {curriculum[level]?.length || 0} bài):
                </span>
                <div className="border border-slate-200 rounded-xl overflow-hidden max-h-48 overflow-y-auto bg-slate-50 shadow-inner">
                  <table className="w-full text-left border-collapse text-[11px]">
                    <thead>
                      <tr className="bg-slate-100 text-slate-500 border-b border-slate-200 font-bold">
                        <th className="px-3 py-1.5 w-12 text-center">STT</th>
                        <th className="px-3 py-1.5 w-32">Chương</th>
                        <th className="px-3 py-1.5">Tên bài học</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-150">
                      {(curriculum[level] || []).map((l, idx) => (
                        <tr key={l.id || idx} className="hover:bg-teal-50/40 bg-white transition">
                          <td className="px-3 py-1.5 text-center font-semibold text-slate-600">{l.lessonNumber}</td>
                          <td className="px-3 py-1.5 truncate text-slate-500 font-medium max-w-[120px]">{l.chapter}</td>
                          <td className="px-3 py-1.5 font-bold text-slate-800">{l.title}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

            </div>

            {/* Modal Footer */}
            <div className="bg-slate-50 border-t border-slate-150 p-4 flex items-center justify-end shrink-0">
              <button
                type="button"
                onClick={() => setShowCurriculumModal(false)}
                className="px-4 py-2 bg-slate-200 text-slate-800 hover:bg-slate-300 text-xs font-bold rounded-lg transition cursor-pointer"
              >
                Đóng hộp thoại
              </button>
            </div>

          </div>
        </div>
      )}

      {/* Primary footer */}
      <footer className="bg-slate-900 text-slate-400 py-6 px-4 border-t border-slate-800 text-center text-xs mt-12 print:hidden shrink-0">
        <div className="max-w-7xl mx-auto space-y-2">
          <p className="font-medium text-slate-300 font-sans">
            Ứng dụng chuyên đổi số giáo án thuộc đề tài: Tích hợp công nghệ hiện đại và Trí tuệ nhân tạo (AI) trong phân phối môn Vật lí THPT.
          </p>
          <p className="text-slate-500 leading-relaxed max-w-3xl mx-auto">
            Quy trình làm việc nghiêm mật, tự động phân tách biểu hiện năng lực của học sinh cụ thể và cách hướng dẫn của giáo viên dựa vào Thông tư số 02/2025/TT-BGDĐT và Quyết định 3439/QĐ-BGDĐT.
          </p>
          <div className="pt-2 text-[11px] text-slate-600 border-t border-slate-800 max-w-xs mx-auto">
            Học liệu độc quyền của Giáo viên Vật lí Việt Nam.
          </div>
        </div>
      </footer>
    </div>
  );
}
