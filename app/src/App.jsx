import React, { useState, useEffect } from 'react';
import { 
  Plus, Trash2, Copy, Check, Info, Settings, Users, FileText, 
  ChevronDown, ChevronUp, Save, Calendar, Sun, Moon, LayoutGrid, X,
  Upload, AlertCircle, ShieldCheck, Github, ExternalLink, Table
} from 'lucide-react';

// --- 风格化组件 (Styled Components) ---

const Card = ({ children, className = "" }) => (
  <div className={`bg-white rounded-lg border border-stone-200 shadow-[0_2px_8px_rgba(0,0,0,0.04)] ${className}`}>
    {children}
  </div>
);

const Button = ({ children, onClick, variant = "primary", className = "", size = "md", disabled = false }) => {
  const baseStyle = "flex items-center gap-2 justify-center font-medium transition-all duration-200 rounded-md active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed disabled:active:scale-100";
  const sizes = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-4 py-2 text-base",
    lg: "px-6 py-3 text-lg"
  };
  const variants = {
    primary: "bg-stone-800 text-white hover:bg-stone-700 hover:shadow-md",
    secondary: "bg-white border border-stone-200 text-stone-600 hover:border-stone-300 hover:bg-stone-50",
    danger: "bg-white border border-red-200 text-red-500 hover:bg-red-50 hover:border-red-300",
    ghost: "bg-transparent text-stone-400 hover:text-stone-600 hover:bg-stone-100",
    accent: "bg-[#E8F3EE] text-[#2C5F48] hover:bg-[#D6EBE4]"
  };

  return (
    <button type="button" onClick={onClick} disabled={disabled} className={`${baseStyle} ${sizes[size]} ${variants[variant]} ${className}`}>
      {children}
    </button>
  );
};

const InputGroup = ({ label, subLabel, value, onChange, type = "text", placeholder, required }) => (
  <div className="mb-5 group">
    <label className="block text-sm font-semibold text-stone-700 mb-1.5 transition-colors group-focus-within:text-stone-900">
      {label} {required && <span className="text-red-400">*</span>}
    </label>
    {subLabel && <p className="text-sm text-stone-400 mb-2 leading-relaxed">{subLabel}</p>}
    <input
      type={type}
      value={value}
      onChange={(e) => onChange(type === 'number' ? Number(e.target.value) : e.target.value)}
      className="w-full px-3 py-2.5 bg-stone-50 border border-stone-200 rounded-md text-stone-700 text-sm outline-none transition-all focus:bg-white focus:border-stone-400 focus:shadow-[0_0_0_2px_rgba(87,83,78,0.1)] placeholder:text-stone-300"
      placeholder={placeholder}
    />
  </div>
);

const TextAreaGroup = ({ label, subLabel, value, onChange, placeholder, rows = 3 }) => (
  <div className="mb-5 group">
    <label className="block text-sm font-semibold text-stone-700 mb-1.5 group-focus-within:text-stone-900">{label}</label>
    {subLabel && <p className="text-sm text-stone-400 mb-2 leading-relaxed">{subLabel}</p>}
    <textarea
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full px-3 py-2.5 bg-stone-50 border border-stone-200 rounded-md text-stone-700 text-sm font-mono outline-none transition-all focus:bg-white focus:border-stone-400 focus:shadow-[0_0_0_2px_rgba(87,83,78,0.1)] placeholder:text-stone-300 resize-y"
      rows={rows}
      placeholder={placeholder}
    />
  </div>
);

const Toggle = ({ label, checked, onChange }) => (
  <div 
    className="flex items-center justify-between py-2 cursor-pointer select-none"
    onClick={() => onChange(!checked)}
  >
    <span className="text-sm font-medium text-stone-600">{label}</span>
    <div className={`w-10 h-5 flex items-center rounded-full p-1 duration-300 ease-in-out ${checked ? 'bg-stone-800' : 'bg-stone-200'}`}>
      <div className={`bg-white w-3 h-3 rounded-full shadow-sm transform duration-300 ease-in-out ${checked ? 'translate-x-5' : ''}`}></div>
    </div>
  </div>
);

const Modal = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/40 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-2xl overflow-hidden animate-in zoom-in-95 duration-200">
        <div className="flex items-center justify-between p-4 border-b border-stone-100 bg-stone-50">
          <h3 className="font-bold text-stone-700 flex items-center gap-2">{title}</h3>
          <button type="button" onClick={onClose} className="text-stone-400 hover:text-stone-600 transition-colors">
            <X size={20} />
          </button>
        </div>
        <div className="p-6">
          {children}
        </div>
      </div>
    </div>
  );
};

// --- 课程表编辑器辅助组件 ---

const CourseDayColumn = ({ dayName, courses, onUpdate }) => {
  const [inputValue, setInputValue] = useState("");
  const [editingIndex, setEditingIndex] = useState(null);
  const [editValue, setEditValue] = useState("");
  const safeCourses = Array.isArray(courses) ? courses : [];

  const addCourse = () => {
    if (!inputValue.trim()) return;
    onUpdate([...safeCourses, inputValue.trim()]);
    setInputValue("");
  };

  const startEdit = (idx) => {
    setEditingIndex(idx);
    setEditValue(safeCourses[idx]);
  };

  const saveEdit = () => {
    const trimmed = editValue.trim();
    if (trimmed && trimmed !== safeCourses[editingIndex]) {
      const updated = [...safeCourses];
      updated[editingIndex] = trimmed;
      onUpdate(updated);
    }
    setEditingIndex(null);
  };

  return (
    <div className="flex flex-col gap-2 min-w-[100px]">
      <div className="text-center text-sm font-bold text-stone-400 uppercase tracking-wider mb-1">{dayName}</div>
      <div className="bg-stone-50 rounded-lg p-2 border border-stone-100 min-h-[120px] space-y-2">
        {safeCourses.map((c, idx) => (
          <div key={idx} className="bg-white px-2 py-1.5 rounded border border-stone-200 text-sm text-stone-700 shadow-sm flex justify-between group items-center">
            {editingIndex === idx ? (
              <input
                autoFocus
                className="flex-1 text-sm bg-transparent border-b border-stone-400 outline-none px-1"
                value={editValue}
                onChange={e => setEditValue(e.target.value)}
                onBlur={saveEdit}
                onKeyDown={e => e.key === 'Enter' && saveEdit()}
              />
            ) : (
              <span className="truncate cursor-pointer" onClick={() => startEdit(idx)}>{c}</span>
            )}
            <button
              type="button"
              onClick={() => onUpdate(safeCourses.filter((_, i) => i !== idx))}
              className="text-stone-300 hover:text-red-400 opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <X size={12} />
            </button>
          </div>
        ))}
        <div className="flex gap-1">
          <input
            className="w-full text-sm bg-transparent border-b border-stone-200 focus:border-stone-400 outline-none px-1 py-1"
            placeholder="添加..."
            value={inputValue}
            onChange={e => setInputValue(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && addCourse()}
          />
          <button type="button" onClick={addCourse} className="text-stone-400 hover:text-stone-600"><Plus size={14}/></button>
        </div>
      </div>
    </div>
  );
};

// --- 课程表编辑器组件 ---

const CourseEditor = ({ value, onChange }) => {
  const isComplex = value && typeof value === 'object' && !Array.isArray(value);
  const mode = isComplex ? 'complex' : 'simple';
  
  const [activeComplexTab, setActiveComplexTab] = useState('odd');
  const weekDays = ['周一', '周二', '周三', '周四', '周五', '周六', '周日'];

  const emptyWeek = () => Array(7).fill().map(() => []);
  const defaultComplexStructure = () => ({
    benchmark: { date: new Date().toISOString().split('T')[0], isOdd: true },
    courses: { odd: emptyWeek(), even: emptyWeek() }
  });

  const getSimpleDataSafe = () => {
    if (Array.isArray(value)) {
      if (value.length < 7) {
        return [...value, ...Array(7 - value.length).fill([])];
      }
      return value;
    }
    return emptyWeek();
  };

  const getComplexDataSafe = () => {
    const defaults = defaultComplexStructure();
    if (!isComplex) return defaults;

    return {
      benchmark: {
        date: value?.benchmark?.date || defaults.benchmark.date,
        isOdd: value?.benchmark?.isOdd ?? defaults.benchmark.isOdd
      },
      courses: {
        odd: Array.isArray(value?.courses?.odd) ? value.courses.odd : defaults.courses.odd,
        even: Array.isArray(value?.courses?.even) ? value.courses.even : defaults.courses.even
      }
    };
  };

  const complexSnapshot = getComplexDataSafe();

  const setSimpleMode = () => {
    if (Array.isArray(value)) return;
    
    if (window.confirm("切换到简单模式将清除‘双周’设置，仅保留‘单周’课程作为配置。确认吗？")) {
       const oddCourses = complexSnapshot.courses.odd;
       onChange(oddCourses);
    }
  };

  const setComplexMode = () => {
    if (isComplex) return;
    
    if (window.confirm("注意：切换到单双周模式是破坏性操作。如果未来切回简单模式，部分数据可能会丢失。确认继续吗？")) {
        const currentSimple = getSimpleDataSafe();
        onChange({
          ...defaultComplexStructure(),
          courses: { odd: currentSimple, even: emptyWeek() }
        });
    }
  };

  const updateBenchmark = (key, val) => {
    if (!isComplex) return;
    const current = getComplexDataSafe();
    onChange({
      ...current,
      benchmark: { ...current.benchmark, [key]: val }
    });
  };

  const updateSimpleCourse = (dayIdx, newCourses) => {
    const current = getSimpleDataSafe();
    const newData = [...current];
    newData[dayIdx] = newCourses;
    onChange(newData);
  };

  const updateComplexCourse = (dayIdx, newCourses) => {
    const current = getComplexDataSafe();
    const targetKey = activeComplexTab;
    const targetWeek = [...current.courses[targetKey]];
    targetWeek[dayIdx] = newCourses;

    onChange({
      ...current,
      courses: {
        ...current.courses,
        [targetKey]: targetWeek
      }
    });
  };

  return (
    <div className="mt-4 bg-white border border-stone-200 rounded-lg p-4 shadow-sm">
      <div className="flex items-center justify-between mb-6 pb-4 border-b border-stone-100">
        <h3 className="text-sm font-bold text-stone-700 flex items-center gap-2">
          <Calendar size={16} /> 课程表配置
        </h3>
        <div className="flex bg-stone-100 p-1 rounded-md">
          <button 
            type="button"
            onClick={setSimpleMode}
            className={`px-3 py-1 text-sm font-medium rounded transition-colors ${mode === 'simple' ? 'bg-white text-stone-800 shadow-sm' : 'text-stone-500 hover:text-stone-700'}`}
          >
            简单模式
          </button>
          <button 
            type="button"
            onClick={setComplexMode}
            className={`px-3 py-1 text-sm font-medium rounded transition-colors ${mode === 'complex' ? 'bg-white text-stone-800 shadow-sm' : 'text-stone-500 hover:text-stone-700'}`}
          >
            单双周模式
          </button>
        </div>
      </div>

      {mode === 'complex' && (
        <div className="mb-6 grid grid-cols-1 md:grid-cols-2 gap-4 bg-stone-50 p-3 rounded border border-stone-100">
          <div className="flex items-center gap-3">
            <span className="text-sm font-medium text-stone-500">开学基准日:</span>
            <input 
              type="date" 
              value={complexSnapshot.benchmark.date} 
              onChange={e => updateBenchmark('date', e.target.value)}
              className="bg-white border border-stone-200 rounded px-2 py-1 text-sm text-stone-700"
            />
          </div>
          <div className="flex items-center gap-3">
             <span className="text-sm font-medium text-stone-500">基准日是否为单周:</span>
             <button 
               type="button"
               onClick={() => updateBenchmark('isOdd', !complexSnapshot.benchmark.isOdd)}
               className={`text-sm px-2 py-1 rounded border ${complexSnapshot.benchmark.isOdd ? 'bg-[#E8F3EE] border-[#BCE0D1] text-[#2C5F48]' : 'bg-white border-stone-200 text-stone-500'}`}
             >
               {complexSnapshot.benchmark.isOdd ? "是 (单周)" : "否 (双周)"}
             </button>
          </div>
        </div>
      )}

      {mode === 'complex' && (
        <div className="flex gap-4 mb-4 border-b border-stone-100">
          <button 
            type="button"
            onClick={() => setActiveComplexTab('odd')}
            className={`pb-2 text-sm font-bold border-b-2 transition-colors ${activeComplexTab === 'odd' ? 'border-stone-800 text-stone-800' : 'border-transparent text-stone-400 hover:text-stone-600'}`}
          >
            单周课表
          </button>
          <button 
            type="button"
            onClick={() => setActiveComplexTab('even')}
            className={`pb-2 text-sm font-bold border-b-2 transition-colors ${activeComplexTab === 'even' ? 'border-stone-800 text-stone-800' : 'border-transparent text-stone-400 hover:text-stone-600'}`}
          >
            双周课表
          </button>
        </div>
      )}

      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-3">
        {weekDays.map((day, idx) => {
          let courses = [];
          if (mode === 'simple') {
            const data = getSimpleDataSafe();
            courses = data[idx] || [];
          } else {
            const weekData = complexSnapshot.courses[activeComplexTab];
            courses = weekData && weekData[idx] ? weekData[idx] : [];
          }

          return (
            <CourseDayColumn 
              key={day} 
              dayName={day} 
              courses={courses} 
              onUpdate={(newCourses) => {
                if (mode === 'simple') {
                  updateSimpleCourse(idx, newCourses);
                } else {
                  updateComplexCourse(idx, newCourses);
                }
              }}
            />
          );
        })}
      </div>
    </div>
  );
};

// --- 变量参考表组件 ---

const VariableReference = () => {
  const [isOpen, setIsOpen] = useState(false);
  
  const variables = [
    { name: 'date', source: '内置', dep: '无', desc: '当前日期，格式如 "2023年01月01日"' },
    { name: 'city', source: '基础天气/用户', dep: 'city (优先) / weatherCityCode', desc: '用户所在城市' },
    { name: 'weather', source: '基础天气API', dep: 'weatherCityCode', desc: '当日天气状况' },
    { name: 'max_temperature', source: '基础天气API', dep: 'weatherCityCode', desc: '最高温度' },
    { name: 'min_temperature', source: '基础天气API', dep: 'weatherCityCode', desc: '最低温度' },
    { name: 'wind_direction', source: '基础天气API', dep: 'weatherCityCode', desc: '风向' },
    { name: 'wind_scale', source: '基础天气API', dep: 'weatherCityCode', desc: '风力等级' },
    { name: 'birthday_message', source: '内置', dep: 'festivals', desc: '最近一个生日/纪念日倒数提醒' },
    { name: '[keyword]', source: '内置', dep: 'customizedDateList', desc: '累计日天数，[keyword]替换为自定义的key' },
    { name: 'english_note', source: '金山词霸', dep: '无', desc: '每日一句英文' },
    { name: 'chinese_note', source: '金山词霸', dep: '无', desc: '每日一句中文' },
    { name: 'moment_copyrighting', source: '一言', dep: '无', desc: '随机一言' },
    { name: 'today_courses', source: '内置', dep: 'courseSchedule', desc: '当日课程安排' },
    { name: 'morning_greeting', source: '天行API', dep: 'TIAN_API_KEY & morning', desc: '早安心语' },
    { name: 'evening_greeting', source: '天行API', dep: 'TIAN_API_KEY & evening', desc: '晚安心语' },
    { name: 'tian_weather', source: '天行API', dep: 'TIAN_API_KEY & weatherDays', desc: '天行天气预报' },
    { name: 'network_hot', source: '天行API', dep: 'TIAN_API_KEY & hotCount', desc: '全网热搜榜' },
  ];

  return (
    <div className="mt-6 border border-stone-200 rounded-lg overflow-hidden">
      <div 
        className="bg-stone-50 p-4 flex justify-between items-center cursor-pointer hover:bg-stone-100 transition-colors"
        onClick={() => setIsOpen(!isOpen)}
      >
        <h3 className="text-sm font-bold text-stone-700 flex items-center gap-2">
          <Table size={16} /> 可用模板变量参考表
        </h3>
        {isOpen ? <ChevronUp size={16} className="text-stone-400"/> : <ChevronDown size={16} className="text-stone-400"/>}
      </div>
      
      {isOpen && (
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-stone-50 border-b border-stone-200 text-stone-500">
              <tr>
                <th className="px-4 py-2 font-medium">变量名 (复制)</th>
                <th className="px-4 py-2 font-medium">数据来源</th>
                <th className="px-4 py-2 font-medium">依赖配置</th>
                <th className="px-4 py-2 font-medium">说明</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100">
              {variables.map((v) => (
                <tr key={v.name} className="hover:bg-stone-50/50">
                  <td className="px-4 py-2 font-mono text-blue-600 select-all">{`{{${v.name}.DATA}}`}</td>
                  <td className="px-4 py-2 text-stone-600">{v.source}</td>
                  <td className="px-4 py-2 text-stone-500">{v.dep}</td>
                  <td className="px-4 py-2 text-stone-600">{v.desc}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

// --- 主应用组件 ---

export default function App() {
  const [activeTab, setActiveTab] = useState('global'); 
  const [copied, setCopied] = useState(false);
  const [showImport, setShowImport] = useState(false);
  const [importText, setImportText] = useState("");
  const [importError, setImportError] = useState("");

  // Data States
  const [globalConfig, setGlobalConfig] = useState({
    APP_ID: '', APP_SECRET: '', TIAN_API_KEY: '',
    FESTIVALS_LIMIT: 0, MAX_PUSH_ONE_MINUTE: 5, SLEEP_TIME: 65000,
    API_TIMEOUT: 10000, MAX_RETRIES: 3, RETRY_DELAY: 2000,
  });

  const [templates, setTemplates] = useState([
    { id: "0001", title: "早安模板", desc: "今天是：{{date.DATA}}\n城市：{{city.DATA}}\n天气：{{weather.DATA}}\n气温：{{min_temperature.DATA}}~{{max_temperature.DATA}}℃\n\n{{birthday_message.DATA}}\n\n每日一句：\n{{english_note.DATA}}\n{{chinese_note.DATA}}" }
  ]);

  const [users, setUsers] = useState([
    {
      name: "示例用户", id: "", wechatTemplateId: "", pushDeerKey: "", useTemplateId: "0001",
      city: "北京", weatherCityCode: "101010100", 
      festivals: [], customizedDateList: [], courseSchedule: null,
      tianApi: { morning: true, evening: true, weatherDays: true, hotCount: 5, hotType: 'default' },
      showColor: true
    }
  ]);

  // Handlers
  const handleGlobalChange = (key, value) => setGlobalConfig(prev => ({ ...prev, [key]: value }));
  
  const addTemplate = () => setTemplates([...templates, { id: Date.now().toString(), title: "新模板", desc: "" }]);
  const removeTemplate = (idx) => setTemplates(templates.filter((_, i) => i !== idx));
  const updateTemplate = (idx, key, value) => {
    const newTemplates = [...templates];
    newTemplates[idx][key] = value;
    setTemplates(newTemplates);
  };

  const addUser = () => setUsers([...users, {
    name: `用户 ${users.length + 1}`, id: "", wechatTemplateId: "", pushDeerKey: "", useTemplateId: templates[0]?.id || "",
    city: "北京", weatherCityCode: "", festivals: [], customizedDateList: [], courseSchedule: null,
    tianApi: { morning: false, evening: false, weatherDays: false, hotCount: 0, hotType: 'default' }, showColor: true
  }]);
  const removeUser = (idx) => setUsers(users.filter((_, i) => i !== idx));
  
  const updateUser = (idx, key, value) => {
    const newUsers = [...users];
    newUsers[idx] = { ...newUsers[idx] };

    if (key.includes('.')) {
      const [p, c] = key.split('.');
      newUsers[idx][p] = { ...newUsers[idx][p], [c]: value };
    } else {
      newUsers[idx][key] = value;
    }
    setUsers(newUsers);
  };

  const addSubItem = (userIdx, field, item) => {
    const newUsers = [...users];
    newUsers[userIdx] = { ...newUsers[userIdx] };
    newUsers[userIdx][field] = [...(newUsers[userIdx][field] || []), item];
    setUsers(newUsers);
  };
  const removeSubItem = (userIdx, field, itemIdx) => {
    const newUsers = [...users];
    newUsers[userIdx] = { ...newUsers[userIdx] };
    const newList = [...newUsers[userIdx][field]];
    newList.splice(itemIdx, 1);
    newUsers[userIdx][field] = newList;
    setUsers(newUsers);
  };
  const updateSubItem = (userIdx, field, itemIdx, key, value) => {
    const newUsers = [...users];
    newUsers[userIdx] = { ...newUsers[userIdx] };
    const newList = [...newUsers[userIdx][field]];
    newList[itemIdx] = { ...newList[itemIdx], [key]: value };
    newUsers[userIdx][field] = newList;
    setUsers(newUsers);
  };

  const generateConfig = () => JSON.stringify({ ...globalConfig, TEMPLATE_CONFIG: templates, USER_INFO: users });
  
  const copyToClipboard = () => {
    const text = generateConfig();
    const textArea = document.createElement("textarea");
    textArea.value = text;
    textArea.style.position = "fixed";
    textArea.style.left = "-9999px";
    textArea.style.top = "0";
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    try {
      const successful = document.execCommand('copy');
      if (successful) {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      } else {
        alert("复制失败，请手动选择文本进行复制。");
      }
    } catch (err) {
      alert("复制出错，请手动选择文本进行复制。");
    }
    document.body.removeChild(textArea);
  };

  // --- Import Logic ---
  const handleImport = () => {
    if (!importText.trim()) return;
    setImportError("");

    try {
      const data = JSON.parse(importText);
      
      setGlobalConfig(prev => {
        const next = { ...prev };
        Object.keys(prev).forEach(key => {
          if (data[key] !== undefined) next[key] = data[key];
        });
        return next;
      });

      if (Array.isArray(data.TEMPLATE_CONFIG)) {
         const importedTemplates = data.TEMPLATE_CONFIG.map((t, i) => ({
           id: t.id || `tpl_${Date.now()}_${i}`,
           title: t.title || "导入的模板",
           desc: t.desc || ""
         }));
         setTemplates(importedTemplates);
      }

      if (Array.isArray(data.USER_INFO)) {
        const importedUsers = data.USER_INFO.map((u, i) => ({
           name: u.name || `导入用户 ${i + 1}`,
           id: u.id || "",
           wechatTemplateId: u.wechatTemplateId || "",
           pushDeerKey: u.pushDeerKey || "",
           useTemplateId: u.useTemplateId || "",
           city: u.city || "",
           weatherCityCode: u.weatherCityCode || "",
           // Removed horoscopeDate
           festivals: Array.isArray(u.festivals) ? u.festivals : [],
           customizedDateList: Array.isArray(u.customizedDateList) ? u.customizedDateList : [],
           courseSchedule: u.courseSchedule || null,
           tianApi: {
             morning: u.tianApi?.morning ?? false,
             evening: u.tianApi?.evening ?? false,
             weatherDays: u.tianApi?.weatherDays ?? false,
             hotCount: u.tianApi?.hotCount ?? 0,
             hotType: u.tianApi?.hotType ?? 'default'
           },
           showColor: u.showColor ?? true
        }));
        setUsers(importedUsers);
      }

      setShowImport(false);
      setImportText("");
      alert("配置导入成功！");
      setActiveTab('users');

    } catch (e) {
      console.error(e);
      setImportError("JSON 格式错误，请检查是否完整复制了 ALL_CONFIG 的值。");
    }
  };

  // --- Render ---

  return (
    <div className="min-h-screen bg-[#FDFBF7] font-sans text-stone-800 pb-24 selection:bg-stone-200 flex flex-col relative">
      
      {/* Import Modal */}
      <Modal isOpen={showImport} onClose={() => setShowImport(false)} title="导入现有配置">
         <div className="space-y-4">
            <div className="bg-amber-50 border border-amber-200 p-3 rounded-lg flex gap-3 text-sm text-amber-800">
               <Info size={20} className="shrink-0" />
               <p>
                 请粘贴您之前的 <code>ALL_CONFIG</code> JSON 字符串。
               </p>
            </div>
            <textarea 
              className="w-full h-48 border border-stone-300 rounded-lg p-3 font-mono text-sm focus:ring-2 focus:ring-stone-400 focus:border-stone-400 outline-none resize-none"
              placeholder='{"APP_ID":"...","USER_INFO":[...]}'
              value={importText}
              onChange={(e) => setImportText(e.target.value)}
            />
            {importError && (
              <div className="text-red-500 text-sm flex items-center gap-2">
                <AlertCircle size={16} /> {importError}
              </div>
            )}
            <div className="flex justify-end gap-3 pt-2">
               <Button variant="secondary" onClick={() => setShowImport(false)}>取消</Button>
               <Button variant="primary" onClick={handleImport} disabled={!importText}>确认导入</Button>
            </div>
         </div>
      </Modal>

      {/* Navbar */}
      <nav className="bg-white border-b border-stone-200 sticky top-0 z-10">
        <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            {/* <div className="w-8 h-8 bg-stone-800 text-white rounded-lg flex items-center justify-center shadow-sm">
              <FileText size={18} strokeWidth={2.5} />
            </div> */}
            <div className="flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-2">
              <h1 className="text-lg font-bold tracking-tight text-stone-800 leading-tight">
                wechat-public-account-push <span className="hidden sm:inline font-medium text-stone-500">配置生成器</span>
              </h1>
              
              <div className="flex items-center gap-2 ml-2 bg-stone-50 p-1 rounded-lg border border-stone-100">
                 <a 
                   href="https://github.com/wangxinleo/wechat-public-account-push" 
                   target="_blank"
                   className="text-stone-600 hover:text-stone-900 transition-colors flex items-center gap-1.5 px-2 py-1 rounded hover:bg-white hover:shadow-sm text-sm font-bold"
                   title="GitHub Project"
                 >
                   <Github size={14} />
                   <span>GitHub</span>
                 </a>
                 <div className="w-px h-4 bg-stone-200"></div>
                 <span className="text-xs font-mono text-stone-500 px-2">
                   0.1
                 </span>
              </div>
            </div>
          </div>
          
          <div className="flex items-center gap-2 sm:gap-4">
             <button
                type="button"
                onClick={() => setShowImport(true)}
                className="text-[#2C5F48] font-medium text-sm sm:text-base flex items-center gap-2 px-3 py-1.5 rounded-md bg-[#E8F3EE] hover:bg-[#D6EBE4] border border-[#BCE0D1] transition-colors shadow-sm hover:shadow-md"
             >
               <Upload size={16} /> <span className="hidden sm:inline">导入配置</span>
             </button>
             <a 
               href="https://github.com/wangxinleo/wechat-public-account-push/qinglong/README.md" 
               target="_blank" 
               className="text-sm sm:text-base font-medium text-stone-500 hover:text-stone-800 transition-colors flex items-center gap-1"
             >
               查看文档
             </a>
          </div>
        </div>
      </nav>

      <main className="w-full mt-6 flex-grow">
        <div className="max-w-5xl mx-auto px-6 space-y-8">

        {/* Safety Notice */}
        <div>
           <div className="bg-emerald-50 border border-emerald-100 rounded-lg p-4 flex items-start gap-3 shadow-sm">
              <ShieldCheck className="text-emerald-600 shrink-0 mt-0.5" size={20} />
              <div>
                <h4 className="text-sm font-bold text-emerald-800 mb-1">安全承诺：纯前端运行</h4>
                <p className="text-sm text-emerald-700 leading-relaxed opacity-90">
                  本工具所有逻辑均在您的浏览器本地执行，不会发起任何网络请求，也不会保存您的任何配置数据到服务器。
                  <br className="hidden sm:block"/>
                  请放心填写 Key 和 ID，配置完成后请自行妥善保管生成的 JSON 字符串。
                </p>
              </div>
           </div>
        </div>

        {/* Sidebar Menu */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-3">
          <div className="sticky top-24 space-y-1">
            {[
              { id: 'global', label: '全局设置', icon: Settings, desc: 'API Key 与系统参数' },
              { id: 'users', label: '用户管理', icon: Users, desc: '管理接收人与课表' },
              { id: 'templates', label: '消息模板', icon: LayoutGrid, desc: '定义推送内容格式' },
              { id: 'output', label: '生成配置', icon: Check, desc: '获取最终 JSON' },
            ].map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => setActiveTab(item.id)}
                className={`w-full group flex items-center gap-4 px-4 py-3.5 rounded-lg transition-all text-left ${
                  activeTab === item.id 
                    ? 'bg-white text-stone-800 shadow-sm border border-stone-200' 
                    : 'text-stone-500 hover:bg-white/60 hover:text-stone-700'
                }`}
              >
                <div className={`p-2 rounded-md transition-colors ${activeTab === item.id ? 'bg-stone-100 text-stone-800' : 'bg-transparent group-hover:bg-stone-100'}`}>
                  <item.icon size={18} />
                </div>
                <div>
                  <div className={`text-sm font-bold ${activeTab === item.id ? 'text-stone-800' : 'text-stone-600'}`}>{item.label}</div>
                  <div className="text-xs text-stone-400 font-medium mt-0.5">{item.desc}</div>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Content Area */}
        <div className="lg:col-span-9 space-y-8">
          
          {activeTab === 'global' && (
            <Card className="p-8">
              <h2 className="text-xl font-bold text-stone-800 mb-6 flex items-center gap-2">
                <Settings className="text-stone-400" /> 全局基础配置
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="md:col-span-2">
                  <div className="bg-blue-50 border border-blue-100 rounded-lg p-4 mb-4">
                    <div className="flex items-start gap-2 text-sm text-blue-800">
                      <Info size={16} className="mt-0.5 shrink-0" />
                      <div>
                        <p className="font-bold">如何获取天行数据 Key：</p>
                        <p className="opacity-90 mt-1">访问天行数据官网注册并获取 API Key</p>
                        <div className="pt-1">
                          <a
                            href="https://www.tianapi.com/gethttp/72-1"
                            target="_blank"
                            className="inline-flex items-center gap-1 text-blue-600 hover:underline font-medium"
                          >
                            前往获取 Key <ExternalLink size={12}/>
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                  <InputGroup
                    label="天行数据 Key" subLabel="用于获取早安、天气、热搜等数据"
                    value={globalConfig.TIAN_API_KEY} onChange={(v) => handleGlobalChange('TIAN_API_KEY', v)} placeholder="请填入 API Key"
                  />
                </div>
                <div className="md:col-span-2">
                  <div className="bg-blue-50 border border-blue-100 rounded-lg p-4 mb-4">
                    <div className="flex items-start gap-2 text-sm text-blue-800">
                      <Info size={16} className="mt-0.5 shrink-0" />
                      <div>
                        <p className="font-bold">如何获取微信配置：</p>
                        <p className="opacity-90 mt-1">查看详细的微信测试号申请和配置指引</p>
                        <div className="pt-1">
                          <a
                            href="https://github.com/wangxinleo/wechat-public-account-push/blob/master/docs/message-channel/test-number.md"
                            target="_blank"
                            className="inline-flex items-center gap-1 text-blue-600 hover:underline font-medium"
                          >
                            查看配置指引 <ExternalLink size={12}/>
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <InputGroup label="微信 AppID" value={globalConfig.APP_ID} onChange={(v) => handleGlobalChange('APP_ID', v)} placeholder="wx..." />
                <InputGroup label="微信 AppSecret" value={globalConfig.APP_SECRET} onChange={(v) => handleGlobalChange('APP_SECRET', v)} />
                <InputGroup label="生日显示数量" type="number" value={globalConfig.FESTIVALS_LIMIT} onChange={(v) => handleGlobalChange('FESTIVALS_LIMIT', v)} />
                <InputGroup label="API 超时 (ms)" type="number" value={globalConfig.API_TIMEOUT} onChange={(v) => handleGlobalChange('API_TIMEOUT', v)} />
              </div>
            </Card>
          )}

          {activeTab === 'users' && (
            <div className="space-y-6">
              <div className="flex justify-between items-end">
                 <div>
                   <h2 className="text-xl font-bold text-stone-800">用户列表</h2>
                   <p className="text-sm text-stone-500 mt-1">配置接收人、城市、纪念日及课表。</p>
                 </div>
                 <Button onClick={addUser} variant="accent" size="sm"><Plus size={16} /> 添加用户</Button>
              </div>

              {users.map((user, uIdx) => (
                <Card key={uIdx} className="overflow-hidden">
                  <div className="bg-stone-50 p-4 border-b border-stone-200 flex justify-between items-center">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-white border border-stone-200 flex items-center justify-center text-stone-600 font-bold text-sm">
                        {uIdx + 1}
                      </div>
                      <span className="font-bold text-stone-700">{user.name}</span>
                    </div>
                    <Button onClick={() => removeUser(uIdx)} variant="ghost" size="sm" className="!p-1 text-stone-400 hover:text-red-500"><Trash2 size={16} /></Button>
                  </div>
                  
                  <div className="p-6">
                    {/* Basic Layout */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-2">
                      <div className="space-y-1">
                        <h4 className="text-sm font-bold text-stone-400 uppercase tracking-wider mb-4 border-b border-stone-100 pb-2">基础信息</h4>
                        <InputGroup label="昵称" value={user.name} onChange={(v) => updateUser(uIdx, 'name', v)} />
                        <div className="bg-blue-50 border border-blue-100 rounded-lg p-3 mb-3">
                          <div className="flex items-start gap-2 text-sm text-blue-800">
                            <Info size={14} className="mt-0.5 shrink-0" />
                            <div>
                              <p className="font-bold">如何获取微信 OpenID：</p>
                              <a
                                href="https://github.com/wangxinleo/wechat-public-account-push/blob/master/docs/message-channel/test-number.md"
                                target="_blank"
                                className="inline-flex items-center gap-1 text-blue-600 hover:underline font-medium mt-0.5"
                              >
                                查看配置指引 <ExternalLink size={12}/>
                              </a>
                            </div>
                          </div>
                        </div>
                        <InputGroup label="微信 OpenID" value={user.id} onChange={(v) => updateUser(uIdx, 'id', v)} />
                        <div className="bg-blue-50 border border-blue-100 rounded-lg p-3 mb-3">
                          <div className="flex items-start gap-2 text-sm text-blue-800">
                            <Info size={14} className="mt-0.5 shrink-0" />
                            <div>
                              <p className="font-bold">如何获取 PushDeer Key：</p>
                              <a
                                href="https://github.com/wangxinleo/wechat-public-account-push/blob/master/docs/message-channel/push-deer.md"
                                target="_blank"
                                className="inline-flex items-center gap-1 text-blue-600 hover:underline font-medium mt-0.5"
                              >
                                查看配置指引 <ExternalLink size={12}/>
                              </a>
                            </div>
                          </div>
                        </div>
                        <InputGroup label="PushDeer Key" value={user.pushDeerKey} onChange={(v) => updateUser(uIdx, 'pushDeerKey', v)} />
                        <div className="mb-5">
                          <label className="block text-sm font-semibold text-stone-700 mb-1.5">使用模板</label>
                          <select 
                            className="w-full px-3 py-2.5 bg-stone-50 border border-stone-200 rounded-md text-stone-700 text-sm outline-none focus:border-stone-400"
                            value={user.useTemplateId}
                            onChange={(e) => updateUser(uIdx, 'useTemplateId', e.target.value)}
                          >
                            <option value="">请选择...</option>
                            {templates.map(t => <option key={t.id} value={t.id}>{t.title}</option>)}
                          </select>
                        </div>
                      </div>

                      <div className="space-y-1">
                        <h4 className="text-sm font-bold text-stone-400 uppercase tracking-wider mb-4 border-b border-stone-100 pb-2">个性化配置</h4>
                        
                        {/* 天气字段说明和独立配置区域 */}
                        <div className="bg-blue-50 border border-blue-100 rounded-lg p-4 mb-4">
                           <div className="flex items-start gap-2 text-sm text-blue-800">
                             <Info size={16} className="mt-0.5 shrink-0" />
                             <div className="space-y-1">
                                <p className="font-bold">关于天气配置（二选一或共用）：</p>
                                <ul className="list-disc ml-4 space-y-0.5 opacity-90">
                                  <li><strong>城市 (city)</strong>：用于天行数据 API（早安/晚安语中的天气），支持中文。</li>
                                  <li><strong>城市代码 (weatherCityCode)</strong>：用于通用天气接口 (<code>{`{{weather.DATA}}`}</code>)，需填写数字代码。</li>
                                </ul>
                                <div className="pt-1">
                                  <a 
                                    href="https://github.com/baichengzhou/weather.api/blob/master/src/main/resources/citycode-2019-08-23.json" 
                                    target="_blank" 
                                    className="inline-flex items-center gap-1 text-blue-600 hover:underline font-medium"
                                  >
                                    查询通用天气城市代码 <ExternalLink size={12}/>
                                  </a>
                                </div>
                             </div>
                           </div>
                        </div>

                        <div className="flex gap-4">
                           <div className="flex-1"><InputGroup label="城市 (天行API)" value={user.city} onChange={(v) => updateUser(uIdx, 'city', v)} placeholder="例如：北京" /></div>
                           <div className="flex-1"><InputGroup label="城市代码 (通用天气)" value={user.weatherCityCode} onChange={(v) => updateUser(uIdx, 'weatherCityCode', v)} placeholder="例如：101010100" /></div>
                        </div>
                        {/* Horoscope removed here */}
                        
                        <div className="bg-stone-50 border border-stone-100 rounded-lg p-4 mt-2">
                          <p className="text-sm font-bold text-stone-400 mb-3">天行 API 开关</p>
                          <div className="grid grid-cols-2 gap-x-4 gap-y-2">
                             <Toggle label="早安心语" checked={user.tianApi.morning} onChange={(v) => updateUser(uIdx, 'tianApi.morning', v)} />
                             <Toggle label="晚安心语" checked={user.tianApi.evening} onChange={(v) => updateUser(uIdx, 'tianApi.evening', v)} />
                             <Toggle label="天气预报" checked={user.tianApi.weatherDays} onChange={(v) => updateUser(uIdx, 'tianApi.weatherDays', v)} />
                             <div className="flex items-center justify-between py-2">
                                <span className="text-sm font-medium text-stone-600">热搜条数</span>
                                <input type="number" className="w-12 text-center text-sm border rounded py-1" value={user.tianApi.hotCount} onChange={(e) => updateUser(uIdx, 'tianApi.hotCount', Number(e.target.value))} />
                             </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Lists */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-6 pt-6 border-t border-stone-100">
                      <div>
                        <div className="flex justify-between items-center mb-3">
                           <span className="text-sm font-bold text-stone-700">纪念日</span>
                           <button type="button" onClick={() => addSubItem(uIdx, 'festivals', { name: "生日", date: "" })} className="text-sm text-stone-400 hover:text-stone-800 flex items-center gap-1"><Plus size={12}/> 添加</button>
                        </div>
                        <div className="space-y-2">
                          {user.festivals.map((fes, fIdx) => (
                            <div key={fIdx} className="flex gap-2">
                               <input className="flex-1 text-sm bg-stone-50 border border-stone-200 rounded px-2 py-1.5 focus:bg-white focus:border-stone-400 outline-none" placeholder="名称" value={fes.name} onChange={(e) => updateSubItem(uIdx, 'festivals', fIdx, 'name', e.target.value)} />
                               <input className="w-24 text-sm bg-stone-50 border border-stone-200 rounded px-2 py-1.5 focus:bg-white focus:border-stone-400 outline-none" placeholder="MM-DD" value={fes.date} onChange={(e) => updateSubItem(uIdx, 'festivals', fIdx, 'date', e.target.value)} />
                               <button type="button" onClick={() => removeSubItem(uIdx, 'festivals', fIdx)} className="text-stone-300 hover:text-red-400"><Trash2 size={14}/></button>
                            </div>
                          ))}
                          {user.festivals.length === 0 && <div className="text-sm text-stone-300 italic py-2 text-center border border-dashed border-stone-200 rounded">暂无纪念日</div>}
                        </div>
                      </div>

                      <div>
                        <div className="flex justify-between items-center mb-3">
                           <span className="text-sm font-bold text-stone-700">累计日 (在一起)</span>
                        <button type="button" onClick={() => addSubItem(uIdx, 'customizedDateList', { keyword: "love_day", date: "" })} className="text-sm text-stone-400 hover:text-stone-800 flex items-center gap-1"><Plus size={12}/> 添加</button>
                        </div>
                        <div className="space-y-2">
                          {user.customizedDateList.map((custom, cIdx) => (
                            <div key={cIdx} className="flex gap-2">
                               <input className="flex-1 text-sm bg-stone-50 border border-stone-200 rounded px-2 py-1.5 focus:bg-white focus:border-stone-400 outline-none" placeholder="Key" value={custom.keyword} onChange={(e) => updateSubItem(uIdx, 'customizedDateList', cIdx, 'keyword', e.target.value)} />
                               <input className="w-24 text-sm bg-stone-50 border border-stone-200 rounded px-2 py-1.5 focus:bg-white focus:border-stone-400 outline-none" placeholder="YYYY-MM-DD" value={custom.date} onChange={(e) => updateSubItem(uIdx, 'customizedDateList', cIdx, 'date', e.target.value)} />
                               <button type="button" onClick={() => removeSubItem(uIdx, 'customizedDateList', cIdx)} className="text-stone-300 hover:text-red-400"><Trash2 size={14}/></button>
                            </div>
                          ))}
                        {user.customizedDateList.length === 0 && <div className="text-sm text-stone-300 italic py-2 text-center border border-dashed border-stone-200 rounded">暂无配置</div>}
                        </div>
                      </div>
                    </div>

                    {/* New Course Editor */}
                    <div className="mt-8 pt-6 border-t border-stone-100">
                      <CourseEditor 
                        value={user.courseSchedule} 
                        onChange={(newSchedule) => updateUser(uIdx, 'courseSchedule', newSchedule)} 
                      />
                    </div>

                  </div>
                </Card>
              ))}
            </div>
          )}

          {activeTab === 'templates' && (
            <div className="space-y-6">
              <div className="flex justify-between items-end">
                <div>
                   <h2 className="text-xl font-bold text-stone-800">消息模板</h2>
                   <p className="text-sm text-stone-500 mt-1">定义推送的具体文案和变量。</p>
                </div>
                <Button onClick={addTemplate} variant="primary" size="sm"><Plus size={16} /> 新建模板</Button>
              </div>

              {templates.map((tpl, idx) => (
                <Card key={idx} className="overflow-hidden group">
                  <div className="bg-stone-50 p-4 border-b border-stone-100 flex justify-between items-center">
                    <span className="font-mono text-sm font-bold text-stone-500 bg-white border border-stone-200 px-2 py-1 rounded">ID: {tpl.id}</span>
                    <Button onClick={() => removeTemplate(idx)} variant="ghost" size="sm" className="!p-1 text-stone-400 hover:text-red-500"><Trash2 size={16} /></Button>
                  </div>
                  <div className="p-6">
                    <div className="grid grid-cols-3 gap-4">
                      <div className="col-span-1">
                        <InputGroup label="模板 ID" value={tpl.id} onChange={(v) => updateTemplate(idx, 'id', v)} required />
                      </div>
                      <div className="col-span-2">
                        <InputGroup label="模板标题" value={tpl.title} onChange={(v) => updateTemplate(idx, 'title', v)} />
                      </div>
                    </div>
                    <TextAreaGroup 
                      label="模板内容" subLabel="支持 {{weather.DATA}} 等动态变量"
                      value={tpl.desc} onChange={(v) => updateTemplate(idx, 'desc', v)} rows={6} 
                    />
                  </div>
                </Card>
              ))}
              
              <VariableReference />
            </div>
          )}

          {activeTab === 'output' && (
            <Card className="p-0 overflow-hidden">
               <div className="p-6 bg-stone-800 text-white">
                 <h2 className="text-xl font-bold flex items-center gap-2">
                   <Check className="text-emerald-400" /> 准备就绪
                 </h2>
                 <p className="opacity-70 text-sm mt-1">
                   您的配置 JSON 已自动生成。
                 </p>
               </div>
               
               <div className="p-6">
                 <div className="mb-6 bg-[#E8F3EE] border border-[#D6EBE4] p-4 rounded-lg text-sm text-[#2C5F48]">
                    <strong>配置指南：</strong>
                    <ol className="list-decimal ml-4 mt-2 space-y-1 opacity-80">
                      <li>点击右上角按钮复制内容。</li>
                      <li>在青龙面板添加环境变量 <code>ALL_CONFIG</code>。</li>
                      <li>将内容粘贴进去即可。</li>
                    </ol>
                 </div>

                 <div className="relative group">
                    <textarea
                      readOnly
                      className="w-full h-80 bg-stone-50 border border-stone-200 rounded-lg p-5 font-mono text-sm text-stone-600 focus:outline-none resize-none leading-relaxed"
                      value={generateConfig()}
                    />
                    <div className="absolute top-4 right-4">
                      <Button onClick={copyToClipboard} variant={copied ? "accent" : "primary"} size="sm">
                        {copied ? <Check size={16} /> : <Copy size={16} />}
                        {copied ? "已复制" : "复制 JSON"}
                      </Button>
                    </div>
                 </div>
               </div>
            </Card>
          )}

        </div>
        </div>
        </div>
      </main>
      
      {/* Footer */}
      <footer className="fixed bottom-0 left-0 right-0 bg-white/80 backdrop-blur-md border-t border-stone-200 py-3 z-20">
        <div className="max-w-5xl mx-auto px-6 flex items-center justify-center gap-4 text-sm text-stone-500 font-medium">
           <span>&copy; {new Date().getFullYear()} wangxinleo. All rights reserved.</span>
           <a 
             href="https://github.com/wangxinleo/wechat-public-account-push" 
             target="_blank" 
             className="flex items-center gap-1 text-stone-400 hover:text-stone-700 transition-colors"
           >
             <Github size={14} /> GitHub Repository
           </a>
        </div>
      </footer>
    </div>
  );
}