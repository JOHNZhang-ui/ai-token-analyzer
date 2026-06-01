// ============================================================
// TokenCost i18n — en / zh / ja / ko
// All UI strings in one place. Data (models.js) is language-agnostic.
// ============================================================

const I18N = {
  current: 'en',
  supported: ['en', 'zh', 'ja', 'ko'],

  strings: {
    // ── Nav ──
    'nav.compare':        { en: 'Compare',        zh: '价格对比',      ja: '比較',              ko: '비교' },
    'nav.calculator':     { en: 'Calculator',     zh: '成本计算器',    ja: '計算機',            ko: '계산기' },
    'nav.recommend':      { en: 'Recommend',      zh: '模型推荐',      ja: 'おすすめ',          ko: '추천' },
    'nav.bundles':        { en: 'Bundles',         zh: '套餐对比',      ja: 'プラン比較',        ko: '번들 비교' },
    'nav.trends':         { en: 'Trends',          zh: '价格趋势',      ja: '価格推移',          ko: '가격 추세' },
    'nav.blog':           { en: 'Insights',        zh: '行业洞察',      ja: 'インサイト',        ko: '인사이트' },
    'nav.pricing':        { en: 'Pricing',         zh: '定价方案',      ja: '料金プラン',        ko: '요금제' },
    'nav.upgrade':        { en: 'Upgrade to Pro',  zh: '升级 Pro',      ja: 'Proにアップグレード', ko: 'Pro 업그레이드' },

    // ── Hero ──
    'hero.badge':         { en: 'Updated May 2026 — 20+ models tracked', zh: '2026年5月更新 — 追踪20+模型', ja: '2026年5月更新 — 20以上のモデルを追跡', ko: '2026년 5월 업데이트 — 20개 이상 모델 추적' },
    'hero.title':         { en: 'Stop Overpaying for AI Tokens',         zh: '别再为 AI Token 多花冤枉钱',     ja: 'AIトークンにお金をかけすぎないで',   ko: 'AI 토큰에 더 이상 과도한 비용을 내지 마세요' },
    'hero.subtitle':      { en: 'Compare prices across every major AI model. Calculate your exact project costs. Find the optimal model for your budget — in seconds.',
                              zh: '对比所有主流 AI 模型的 API 价格。精确计算项目 Token 成本。几秒钟找到最适合你预算的模型。',
                              ja: '主要なAIモデルのAPI価格を比較。プロジェクトのトークンコストを正確に計算。予算に最適なモデルを数秒で見つけます。',
                              ko: '모든 주요 AI 모델의 API 가격을 비교하세요. 프로젝트 토큰 비용을 정확히 계산하고 예산에 맞는 최적의 모델을 몇 초 만에 찾으세요.' },
    'hero.cta_compare':   { en: 'Compare All Models',   zh: '查看全部模型价格',  ja: '全モデルを比較',    ko: '모든 모델 비교' },
    'hero.cta_calculate': { en: 'Calculate Your Costs', zh: '计算我的成本',      ja: 'コストを計算',       ko: '비용 계산하기' },

    // ── Stats ──
    'stats.models':       { en: 'AI models tracked',              zh: 'AI 模型追踪',       ja: 'AIモデル追跡',            ko: 'AI 모델 추적' },
    'stats.providers':    { en: 'providers compared',             zh: '厂商对比',           ja: 'プロバイダ比較',          ko: '제공업체 비교' },
    'stats.savings':      { en: 'potential savings with optimization', zh: '优化后可节省成本', ja: '最適化で節約可能',         ko: '최적화로 절감 가능' },
    'stats.updates':      { en: 'price updates',                  zh: '价格更新频率',       ja: '価格更新頻度',            ko: '가격 업데이트' },
    'stats.daily':        { en: 'Daily',                          zh: '每日',              ja: '毎日',                   ko: '매일' },

    // ── Compare Table ──
    'compare.title':      { en: 'Model Pricing Comparison',    zh: '模型价格对比',      ja: 'モデル価格比較',           ko: '모델 가격 비교' },
    'compare.desc':       { en: 'Real-time pricing across all major AI providers. Sort by any column, filter by category. <span>Cached pricing</span> available for Pro users.',
                              zh: '实时追踪所有主流 AI 厂商的定价。按列排序、按类别筛选。<span>缓存定价</span>为 Pro 用户开放。',
                              ja: '主要AIプロバイダのリアルタイム価格。列でソート、カテゴリでフィルタ。<span>キャッシュ価格</span>はProユーザー向け。',
                              ko: '주요 AI 제공업체의 실시간 가격. 열별 정렬, 카테고리별 필터링. <span>캐시 가격</span>은 Pro 사용자 전용.' },
    'compare.search':     { en: 'Search models... (e.g., GPT, Claude, Gemini)', zh: '搜索模型... (如 GPT、Claude、Gemini)', ja: 'モデルを検索... (例: GPT, Claude, Gemini)', ko: '모델 검색... (예: GPT, Claude, Gemini)' },
    'compare.all_providers': { en: 'All Providers', zh: '全部厂商', ja: '全プロバイダ', ko: '모든 제공업체' },
    'compare.all_categories':{ en: 'All Categories',zh: '全部类别', ja: '全カテゴリ',   ko: '모든 카테고리' },
    'compare.sort_input':    { en: 'Sort: Input $',  zh: '排序: 输入价格',  ja: 'ソート: 入力$',  ko: '정렬: 입력 $' },
    'compare.sort_output':   { en: 'Sort: Output $', zh: '排序: 输出价格',  ja: 'ソート: 出力$',  ko: '정렬: 출력 $' },
    'compare.th_model':    { en: 'Model',       zh: '模型',     ja: 'モデル',       ko: '모델' },
    'compare.th_provider': { en: 'Provider',    zh: '厂商',     ja: 'プロバイダ',   ko: '제공업체' },
    'compare.th_category': { en: 'Category',    zh: '类别',     ja: 'カテゴリ',     ko: '카테고리' },
    'compare.th_input':    { en: 'Input /1M',   zh: '输入 /1M', ja: '入力 /1M',     ko: '입력 /1M' },
    'compare.th_output':   { en: 'Output /1M',  zh: '输出 /1M', ja: '出力 /1M',     ko: '출력 /1M' },
    'compare.th_cached':   { en: 'Cached Input',zh: '缓存输入',  ja: 'キャッシュ入力', ko: '캐시 입력' },
    'compare.th_context':  { en: 'Context',     zh: '上下文',    ja: 'コンテキスト',  ko: '컨텍스트' },
    'compare.th_maxout':   { en: 'Max Output',  zh: '最大输出',  ja: '最大出力',      ko: '최대 출력' },
    'compare.cat_flagship': { en: 'Flagship',   zh: '旗舰',     ja: 'フラッグシップ', ko: '플래그십' },
    'compare.cat_small':    { en: 'Small / Fast',zh: '小型/快速', ja: '小型/高速',     ko: '소형/고속' },
    'compare.cat_reasoning':{ en: 'Reasoning',  zh: '推理',     ja: '推論',          ko: '추론' },
    'compare.cat_turbo':    { en: 'Turbo',      zh: 'Turbo',   ja: 'Turbo',         ko: 'Turbo' },

    // ── Calculator ──
    'calc.title':         { en: 'Token Cost Calculator',  zh: 'Token 成本计算器',     ja: 'トークンコスト計算機',       ko: '토큰 비용 계산기' },
    'calc.desc':          { en: 'Estimate your exact costs. Pick models, input your token volumes, and see real-time pricing.',
                              zh: '精确计算你的 API 成本。选择模型，输入 Token 用量，实时查看各模型费用。',
                              ja: 'APIコストを正確に計算。モデルを選び、トークン量を入力してリアルタイム価格を確認。',
                              ko: 'API 비용을 정확히 계산하세요. 모델을 선택하고 토큰 사용량을 입력하면 실시간 가격을 확인할 수 있습니다.' },
    'calc.usage_profile': { en: 'Your Usage Profile',      zh: '使用情况配置',       ja: '使用状況',                  ko: '사용량 프로필' },
    'calc.quick_select':  { en: 'Quick Select — Common Use Cases', zh: '快捷选择 — 常见使用场景', ja: 'クイック選択 — 一般的なユースケース', ko: '빠른 선택 — 일반 사용 사례' },
    'calc.input_tokens':  { en: 'Input Tokens per Request',    zh: '每次请求输入 Token 数',  ja: 'リクエストあたりの入力トークン', ko: '요청당 입력 토큰' },
    'calc.output_tokens': { en: 'Output Tokens per Request',   zh: '每次请求输出 Token 数',  ja: 'リクエストあたりの出力トークン', ko: '요청당 출력 토큰' },
    'calc.req_per_day':   { en: 'Requests per Day',            zh: '每日请求次数',            ja: '1日あたりのリクエスト数',     ko: '일일 요청 수' },
    'calc.models_select': { en: 'Models to Compare',           zh: '选择对比模型',            ja: '比較するモデル',             ko: '비교할 모델' },
    'calc.run':           { en: 'Calculate Costs',             zh: '计算成本',               ja: 'コストを計算',               ko: '비용 계산' },
    'calc.pro_upsell':    { en: 'Pro users unlock batch comparison, CSV export, and historical cost trends',
                              zh: 'Pro 用户可解锁批量对比、CSV 导出和历史成本趋势',
                              ja: 'Proユーザーは一括比較、CSVエクスポート、履歴コスト推移を利用可能',
                              ko: 'Pro 사용자는 일괄 비교, CSV 내보내기, 과거 비용 추세를 이용할 수 있습니다' },
    'calc.upgrade_btn':   { en: 'Upgrade to Pro — $9.9/mo',    zh: '升级 Pro — $9.9/月',  ja: 'Proにアップグレード — $9.9/月', ko: 'Pro 업그레이드 — $9.9/월' },
    'calc.results_title': { en: 'Cost Estimates',              zh: '成本估算',              ja: 'コスト見積もり',            ko: '비용 추정' },
    'calc.empty_text':    { en: 'Select models and click "Calculate Costs" to see results',
                              zh: '选择模型并点击"计算成本"查看结果',
                              ja: 'モデルを選択して「コストを計算」をクリック',
                              ko: '모델을 선택하고 "비용 계산"을 클릭하여 결과를 확인하세요' },
    'calc.best_value':    { en: 'Best Value',                  zh: '最优选择',              ja: 'ベストバリュー',            ko: '최고 가성비' },
    'calc.per_call':      { en: 'per call',                    zh: '每次请求',              ja: '1回あたり',                 ko: '호출당' },
    'calc.yearly':        { en: 'calls/year',                  zh: '次/年',                ja: '回/年',                    ko: '회/년' },
    'calc.free_limit':    { en: 'Free tier compares up to',    zh: '免费版最多对比',        ja: '無料版は最大',              ko: '무료 버전 최대 비교' },

    // ── Recommend ──
    'rec.title':          { en: 'Model Recommendation Engine',     zh: '模型推荐引擎',     ja: 'モデル推奨エンジン',        ko: '모델 추천 엔진' },
    'rec.desc':           { en: 'Tell us your usage pattern and budget. We\'ll find the best models for your needs.',
                              zh: '告诉我们你的使用模式和预算，帮你找到最合适的模型。',
                              ja: '使用パターンと予算を教えてください。最適なモデルを見つけます。',
                              ko: '사용 패턴과 예산을 알려주시면 최적의 모델을 찾아드립니다.' },
    'rec.requirements':   { en: 'Your Requirements',               zh: '你的需求',         ja: '要件',                     ko: '요구사항' },
    'rec.input_tokens':   { en: 'Input Tokens per Call',           zh: '每次调用输入 Token', ja: '呼び出しあたりの入力トークン', ko: '호출당 입력 토큰' },
    'rec.output_tokens':  { en: 'Output Tokens per Call',          zh: '每次调用输出 Token', ja: '呼び出しあたりの出力トークン', ko: '호출당 출력 토큰' },
    'rec.calls_per_day':  { en: 'Calls per Day',                   zh: '每日调用次数',      ja: '1日あたりの呼び出し回数',   ko: '일일 호출 수' },
    'rec.budget_label':   { en: 'Monthly Budget (USD, optional)',  zh: '每月预算 (美元, 可选)', ja: '月間予算 (USD, 任意)',   ko: '월 예산 (USD, 선택)' },
    'rec.budget_placeholder': { en: 'Leave blank for all models',  zh: '留空查看所有模型',  ja: '空白で全モデルを表示',      ko: '모든 모델을 보려면 비워두세요' },
    'rec.run':            { en: 'Find Best Models',                zh: '查找最佳模型',      ja: '最適なモデルを検索',        ko: '최적 모델 찾기' },
    'rec.pro_upsell':     { en: 'Pro users get personalized recommendations with quality scoring and latency data',
                              zh: 'Pro 用户获取个性化推荐，包含质量评分和延迟数据',
                              ja: 'Proユーザーは品質スコアとレイテンシデータ付きのパーソナライズ推奨を取得',
                              ko: 'Pro 사용자는 품질 점수와 지연 시간 데이터가 포함된 맞춤 추천을 받을 수 있습니다' },
    'rec.empty':          { en: 'Set your usage parameters and click "Find Best Models"',
                              zh: '设置使用参数并点击"查找最佳模型"',
                              ja: '使用パラメータを設定して「最適なモデルを検索」をクリック',
                              ko: '사용 매개변수를 설정하고 "최적 모델 찾기"를 클릭하세요' },
    'rec.no_budget_fit':  { en: 'No models fit your budget. Try increasing it.',
                              zh: '没有符合预算的模型，请尝试调高预算。',
                              ja: '予算に合うモデルがありません。予算を増やしてみてください。',
                              ko: '예산에 맞는 모델이 없습니다. 예산을 늘려보세요.' },
    'rec.best_badge':     { en: 'Best Value',                      zh: '最优选择',          ja: 'ベストバリュー',            ko: '최고 가성비' },
    'rec.more_models':    { en: 'more models match your criteria. Pro shows full rankings with quality scores.',
                              zh: '个模型符合条件。Pro 版展示完整排名与质量评分。',
                              ja: '件のモデルが条件に一致。Pro版では完全なランキングと品質スコアを表示。',
                              ko: '개 모델이 기준과 일치합니다. Pro 버전은 전체 순위와 품질 점수를 표시합니다.' },

    // ── Bundles ──
    'bundles.title':      { en: 'Subscription Bundle Comparison',  zh: '订阅套餐对比',      ja: 'サブスクリプションプラン比較', ko: '구독 번들 비교' },
    'bundles.desc':       { en: 'Flat-rate subscriptions vs. pay-per-token API. Which saves you more?',
                              zh: '固定月费订阅 vs. 按量付费 API。选哪个更省钱？',
                              ja: '定額制サブスクリプション vs 従量課金API。どちらがお得？',
                              ko: '정액 구독 vs 토큰별 결제 API. 어떤 것이 더 경제적일까요?' },
    'bundles.month':      { en: 'per month',                      zh: '/月',               ja: '/月',                      ko: '/월' },
    'bundles.models_included': { en: 'Models included:',          zh: '包含模型：',         ja: '含まれるモデル：',          ko: '포함된 모델:' },

    // ── Blog ──
    'blog.title':         { en: 'Token Economy Insights',          zh: 'Token 经济洞察',    ja: 'トークンエコノミーインサイト', ko: '토큰 경제 인사이트' },
    'blog.desc':          { en: 'Latest analysis on AI pricing trends, cost optimization strategies, and model comparisons.',
                              zh: 'AI 定价趋势、成本优化策略、模型对比分析。',
                              ja: 'AI価格動向、コスト最適化戦略、モデル比較の最新分析。',
                              ko: 'AI 가격 동향, 비용 최적화 전략, 모델 비교에 대한 최신 분석.' },
    'blog.view_all':      { en: 'View All Insights',               zh: '查看全部文章',      ja: 'すべての記事を見る',        ko: '모든 인사이트 보기' },

    // ── Pricing ──
    'pricing.title':      { en: 'Simple, Transparent Pricing',     zh: '简单透明的定价',    ja: 'シンプルで透明な料金',      ko: '간단하고 투명한 요금' },
    'pricing.desc':       { en: 'Start free. Upgrade when you need more power.',
                              zh: '免费起步，需要更多功能时再升级。',
                              ja: '無料で始めて、必要に応じてアップグレード。',
                              ko: '무료로 시작하고 더 많은 기능이 필요할 때 업그레이드하세요.' },
    'pricing.free_name':  { en: 'Free',                            zh: '免费版',            ja: '無料',                     ko: '무료' },
    'pricing.free_desc':  { en: 'Essential tools for individual developers',
                              zh: '满足个人开发者基本需求的工具',
                              ja: '個人開発者向けの基本ツール',
                              ko: '개인 개발자를 위한 필수 도구' },
    'pricing.free_period':{ en: 'forever free',                    zh: '永久免费',          ja: '永久無料',                 ko: '영원히 무료' },
    'pricing.free_1':     { en: 'Full model price comparison table',     zh: '完整模型价格对比表',    ja: '全モデル価格比較表',        ko: '전체 모델 가격 비교표' },
    'pricing.free_2':     { en: 'Basic token cost calculator (max 3 models)', zh: '基础 Token 成本计算器 (限3模型)', ja: '基本トークンコスト計算機 (最大3モデル)', ko: '기본 토큰 비용 계산기 (최대 3개 모델)' },
    'pricing.free_3':     { en: 'Bundle comparison',                     zh: '套餐对比',          ja: 'プラン比較',                ko: '번들 비교' },
    'pricing.free_4':     { en: '1 use case preset',                     zh: '1 个场景预设',     ja: '1つのユースケースプリセット', ko: '1개 사용 사례 프리셋' },
    'pricing.free_5':     { en: 'Historical price trends',               zh: '历史价格趋势',      ja: '過去の価格推移',            ko: '과거 가격 추세' },
    'pricing.free_6':     { en: 'Batch model comparison',                zh: '批量模型对比',      ja: '一括モデル比較',            ko: '일괄 모델 비교' },
    'pricing.free_7':     { en: 'CSV/JSON export',                       zh: 'CSV/JSON 导出',   ja: 'CSV/JSONエクスポート',     ko: 'CSV/JSON 내보내기' },
    'pricing.free_8':     { en: 'Project cost projections',              zh: '项目成本预测',      ja: 'プロジェクトコスト予測',    ko: '프로젝트 비용 예측' },
    'pricing.free_9':     { en: 'Email cost alerts',                     zh: '邮件成本预警',      ja: 'メールコストアラート',      ko: '이메일 비용 알림' },
    'pricing.free_10':    { en: 'Priority support',                      zh: '优先支持',          ja: '優先サポート',              ko: '우선 지원' },
    'pricing.free_cta':   { en: 'Get Started Free',                      zh: '免费开始使用',      ja: '無料で始める',              ko: '무료로 시작하기' },
    'pricing.pro_name':   { en: 'Pro',                                   zh: '专业版',            ja: 'Pro',                      ko: 'Pro' },
    'pricing.pro_badge':  { en: 'Most Popular',                          zh: '最受欢迎',          ja: '一番人気',                  ko: '가장 인기' },
    'pricing.pro_desc':   { en: 'For teams and serious developers',      zh: '面向团队和专业开发者',  ja: 'チームと本格的な開発者向け',  ko: '팀 및 전문 개발자용' },
    'pricing.pro_price':  { en: '9.90',                                  zh: '9.90',             ja: '9.90',                     ko: '9.90' },
    'pricing.pro_period': { en: 'per month, cancel anytime',             zh: '每月，随时可取消',   ja: '月額、いつでも解約可能',     ko: '월간, 언제든지 취소 가능' },
    'pricing.pro_1':      { en: 'Everything in Free',                    zh: '免费版全部功能',    ja: '無料版の全機能',            ko: '무료 버전 모든 기능' },
    'pricing.pro_2':      { en: 'Unlimited model comparison',            zh: '无限模型对比',      ja: '無制限モデル比較',          ko: '무제한 모델 비교' },
    'pricing.pro_3':      { en: 'Historical price trends & charts',      zh: '历史价格趋势图表',  ja: '過去の価格推移とチャート',  ko: '과거 가격 추세 및 차트' },
    'pricing.pro_4':      { en: 'Batch comparison (up to 10 models)',    zh: '批量对比 (最多10模型)', ja: '一括比較 (最大10モデル)', ko: '일괄 비교 (최대 10개 모델)' },
    'pricing.pro_5':      { en: 'CSV/JSON export',                       zh: 'CSV/JSON 导出',   ja: 'CSV/JSONエクスポート',     ko: 'CSV/JSON 내보내기' },
    'pricing.pro_6':      { en: 'Project cost projections (30/90/365 day)',zh: '项目成本预测 (30/90/365天)', ja: 'プロジェクトコスト予測 (30/90/365日)', ko: '프로젝트 비용 예측 (30/90/365일)' },
    'pricing.pro_7':      { en: 'All use case presets',                  zh: '全部场景预设',      ja: '全ユースケースプリセット',  ko: '모든 사용 사례 프리셋' },
    'pricing.pro_8':      { en: 'Cached input cost analysis',            zh: '缓存输入成本分析',  ja: 'キャッシュ入力コスト分析',  ko: '캐시 입력 비용 분석' },
    'pricing.pro_9':      { en: 'Email alerts on price changes',         zh: '价格变动邮件提醒',  ja: '価格変動メール通知',        ko: '가격 변동 이메일 알림' },
    'pricing.pro_10':     { en: 'Priority support',                      zh: '优先支持',          ja: '優先サポート',              ko: '우선 지원' },
    'pricing.pro_cta':    { en: 'Upgrade to Pro',                        zh: '升级到 Pro',        ja: 'Proにアップグレード',       ko: 'Pro로 업그레이드' },
    'pricing.annual_note':{ en: 'Annual billing saves 20% — $95/year. Need enterprise? <a>Contact us</a>.',
                              zh: '按年购买省 20% — $95/年。需要企业版？<a>联系我们</a>。',
                              ja: '年額請求で20%節約 — $95/年。エンタープライズ版が必要ですか？<a>お問い合わせ</a>。',
                              ko: '연간 결제 시 20% 절약 — $95/년. 엔터프라이즈 버전이 필요하신가요? <a>문의하기</a>.' },

    // ── Historical Trends ──
    'trends.title':       { en: 'Historical Price Trends',        zh: '历史价格趋势',       ja: '過去の価格推移',           ko: '과거 가격 추세' },
    'trends.desc':        { en: 'Track how AI model pricing has evolved over time. Spot patterns, predict future costs.',
                              zh: '追踪 AI 模型价格的历史变化。发现规律，预测未来成本。',
                              ja: 'AIモデル価格の推移を追跡。パターンを発見し、将来のコストを予測。',
                              ko: 'AI 모델 가격의 변화를 추적하세요. 패턴을 발견하고 미래 비용을 예측하세요.' },
    'trends.input_chart': { en: 'Input Price Trend ($/1M tokens)', zh: '输入价格趋势 ($/1M tokens)', ja: '入力価格推移 ($/1Mトークン)', ko: '입력 가격 추세 ($/1M 토큰)' },
    'trends.output_chart':{ en: 'Output Price Trend ($/1M tokens)',zh: '输出价格趋势 ($/1M tokens)', ja: '出力価格推移 ($/1Mトークン)', ko: '출력 가격 추세 ($/1M 토큰)' },
    'trends.insight_title':{ en: 'Price Trend Insight',            zh: '趋势洞察',           ja: '価格推移インサイト',        ko: '가격 추세 인사이트' },
    'trends.insight_default':{ en: 'Select models to see price trend analysis and savings opportunities.',
                              zh: '选择模型查看价格趋势分析和节省机会。',
                              ja: 'モデルを選択して価格推移分析と節約の機会を確認。',
                              ko: '가격 추세 분석과 절감 기회를 보려면 모델을 선택하세요.' },
    'trends.pro_lock':    { en: 'Historical trends require Pro subscription', zh: '历史价格趋势需要 Pro 订阅', ja: '過去の価格推移はProサブスクリプションが必要です', ko: '과거 가격 추세는 Pro 구독이 필요합니다' },

    // ── Newsletter ──
    'newsletter.title':   { en: 'Stay Ahead of AI Pricing',       zh: '掌握 AI 定价先机',   ja: 'AI価格の先を行く',          ko: 'AI 가격 트렌드를 앞서가세요' },
    'newsletter.desc':    { en: 'Weekly AI token economy insights, price change alerts, and cost optimization tips — straight to your inbox.',
                              zh: '每周 AI Token 经济洞察、价格变动提醒和成本优化技巧 — 直达你的邮箱。',
                              ja: '週刊AIトークンエコノミーインサイト、価格変動アラート、コスト最適化のヒント — あなたの受信トレイに直接。',
                              ko: '주간 AI 토큰 경제 인사이트, 가격 변동 알림, 비용 최적화 팁을 받은편지함으로 바로 받아보세요.' },
    'newsletter.placeholder':{ en: 'your@email.com',               zh: '输入你的邮箱',       ja: 'your@email.com',           ko: 'your@email.com' },
    'newsletter.btn':     { en: 'Subscribe Free',                  zh: '免费订阅',           ja: '無料購読',                  ko: '무료 구독' },
    'newsletter.toast':   { en: 'Subscribed! Check your inbox for confirmation.',
                              zh: '订阅成功！请查收确认邮件。',
                              ja: '購読完了！確認メールをご確認ください。',
                              ko: '구독 완료! 확인 이메일을 확인해주세요.' },

    // ── Footer ──
    'footer.tagline':     { en: 'Helping developers make smarter AI infrastructure decisions. Track prices, optimize costs, ship faster.',
                              zh: '帮助开发者做出更聪明的 AI 基础设施决策。追踪价格、优化成本、加速交付。',
                              ja: '開発者がより賢いAIインフラの意思決定を行えるよう支援。価格を追跡し、コストを最適化し、より早く出荷。',
                              ko: '개발자가 더 현명한 AI 인프라 결정을 내릴 수 있도록 지원합니다. 가격 추적, 비용 최적화, 더 빠른 출시.' },
    'footer.tools':       { en: 'Tools',           zh: '工具',     ja: 'ツール',           ko: '도구' },
    'footer.tools_compare':{ en: 'Price Comparison', zh: '价格对比', ja: '価格比較',        ko: '가격 비교' },
    'footer.tools_calc':  { en: 'Cost Calculator',  zh: '成本计算器', ja: 'コスト計算機',    ko: '비용 계산기' },
    'footer.tools_rec':   { en: 'Model Recommender',zh: '模型推荐',  ja: 'モデル推奨',      ko: '모델 추천' },
    'footer.tools_bundle':{ en: 'Bundle Compare',   zh: '套餐对比',  ja: 'プラン比較',      ko: '번들 비교' },
    'footer.resources':   { en: 'Resources',        zh: '资源',     ja: 'リソース',         ko: '리소스' },
    'footer.res_blog':    { en: 'Token Insights',   zh: 'Token 洞察', ja: 'トークンインサイト', ko: '토큰 인사이트' },
    'footer.res_api':     { en: 'API Reference',    zh: 'API 参考',  ja: 'APIリファレンス',  ko: 'API 참조' },
    'footer.res_changelog':{ en: 'Changelog',       zh: '更新日志',  ja: '変更履歴',        ko: '변경 로그' },
    'footer.res_docs':    { en: 'Documentation',    zh: '文档',     ja: 'ドキュメント',     ko: '문서' },
    'footer.company':     { en: 'Company',          zh: '关于',     ja: '会社情報',         ko: '회사' },
    'footer.comp_about':  { en: 'About',            zh: '关于我们',  ja: '会社概要',        ko: '소개' },
    'footer.comp_pricing':{ en: 'Pricing',          zh: '定价',     ja: '料金',             ko: '요금' },
    'footer.comp_terms':  { en: 'Terms',            zh: '服务条款',  ja: '利用規約',        ko: '약관' },
    'footer.comp_privacy':{ en: 'Privacy Policy',   zh: '隐私政策',  ja: 'プライバシーポリシー', ko: '개인정보처리방침' },
    'footer.comp_contact':{ en: 'Contact',           zh: '联系我们',  ja: 'お問い合わせ',    ko: '문의하기' },
    'footer.bottom':      { en: '2026 TokenCost. All prices updated daily. Not affiliated with any AI provider.',
                              zh: '2026 TokenCost。所有价格每日更新。非任何 AI 厂商关联方。',
                              ja: '2026 TokenCost。すべての価格は毎日更新。AIプロバイダとは無関係です。',
                              ko: '2026 TokenCost. 모든 가격은 매일 업데이트됩니다. AI 제공업체와 제휴 관계가 아닙니다.' },
    'footer.built':       { en: 'Built for developers, by developers.', zh: '为开发者而生，由开发者打造。', ja: '開発者のために、開発者によって作られました。', ko: '개발자를 위해, 개발자가 만들었습니다.' },
    'footer.setup':       { en: 'Production Setup', zh: '生产环境配置', ja: '本番環境設定', ko: '프로덕션 설정' },

    // ── Pro Modal ──
    'pro_modal.title':    { en: 'Upgrade to TokenCost Pro',           zh: '升级到 TokenCost Pro',  ja: 'TokenCost Proにアップグレード', ko: 'TokenCost Pro로 업그레이드' },
    'pro_modal.desc':     { en: 'Unlock deep comparison, historical trends, and advanced cost projections.',
                              zh: '解锁深度对比、历史趋势和高级成本预测功能。',
                              ja: '詳細比較、過去の推移、高度なコスト予測をアンロック。',
                              ko: '심층 비교, 과거 추세, 고급 비용 예측을 잠금 해제하세요.' },
    'pro_modal.monthly':  { en: 'Pro Monthly',                         zh: 'Pro 月付',          ja: 'Pro 月額',                 ko: 'Pro 월간' },
    'pro_modal.annual':   { en: 'Pro Annual',                          zh: 'Pro 年付',          ja: 'Pro 年額',                 ko: 'Pro 연간' },
    'pro_modal.save20':   { en: 'Save 20%',                            zh: '省 20%',            ja: '20%節約',                  ko: '20% 절약' },
    'pro_modal.secure':   { en: 'Secure payment via Stripe. Cancel anytime. 7-day money-back guarantee.',
                              zh: '通过 Stripe 安全支付。随时取消。7天无理由退款。',
                              ja: 'Stripeによる安全な支払い。いつでもキャンセル可能。7日間返金保証。',
                              ko: 'Stripe를 통한 안전한 결제. 언제든지 취소 가능. 7일 환불 보장.' },
    'pro_modal.waitlist': { en: 'Join Pro Waitlist',                   zh: '加入 Pro 候补名单', ja: 'Proウェイトリストに参加',   ko: 'Pro 대기자 명단 참여' },
    'pro_modal.coming':   { en: 'Pro subscription coming soon! Join the waitlist.', zh: 'Pro 订阅即将上线！加入候补名单。', ja: 'Proサブスクリプション近日公開！ウェイトリストに参加。', ko: 'Pro 구독이 곧 출시됩니다! 대기자 명단에 참여하세요.' },
    'pro_modal.monthly_btn': { en: 'Subscribe Monthly — $9.90/mo', zh: '月度订阅 — $9.90/月', ja: '月額購読 — $9.90/月',      ko: '월간 구독 — $9.90/월' },
    'pro_modal.annual_btn':  { en: 'Subscribe Annually — $95/year', zh: '年度订阅 — $95/年',   ja: '年額購読 — $95/年',        ko: '연간 구독 — $95/년' },

    // ── Auth ──
    'auth.title':         { en: 'Welcome Back',                       zh: '欢迎回来',          ja: 'おかえりなさい',            ko: '다시 오신 것을 환영합니다' },
    'auth.subtitle':      { en: 'Sign in to unlock Pro features and save your comparisons', zh: '登录以解锁 Pro 功能并保存对比记录', ja: 'ログインしてPro機能をアンロックし、比較を保存', ko: '로그인하여 Pro 기능을 잠금 해제하고 비교를 저장하세요' },
    'auth.sign_in':       { en: 'Sign In',                            zh: '登录',              ja: 'ログイン',                  ko: '로그인' },
    'auth.sign_up':       { en: 'Sign Up',                            zh: '注册',              ja: '登録',                      ko: '가입' },
    'auth.email':         { en: 'Email',                              zh: '邮箱',              ja: 'メールアドレス',            ko: '이메일' },
    'auth.password':      { en: 'Password',                           zh: '密码',              ja: 'パスワード',                ko: '비밀번호' },
    'auth.full_name':     { en: 'Full Name (optional)',               zh: '姓名（选填）',      ja: '氏名（任意）',              ko: '이름 (선택)' },
    'auth.sign_in_btn':   { en: 'Sign In',                            zh: '登录',              ja: 'ログイン',                  ko: '로그인' },
    'auth.create_account':{ en: 'Create Account',                     zh: '创建账号',          ja: 'アカウント作成',            ko: '계정 만들기' },
    'auth.or_continue':   { en: 'or continue with',                   zh: '或用以下方式登录',  ja: 'または以下で続行',          ko: '또는 다음으로 계속' },
    'auth.back':          { en: '← Back to TokenCost',                zh: '← 返回 TokenCost',  ja: '← TokenCostに戻る',        ko: '← TokenCost로 돌아가기' },
    'auth.terms':         { en: 'By signing in, you agree to our <a href="terms.html" target="_blank">Terms</a> and <a href="privacy.html" target="_blank">Privacy Policy</a>.', zh: '登录即表示同意我们的<a href="terms.html" target="_blank">服务条款</a>和<a href="privacy.html" target="_blank">隐私政策</a>。', ja: 'ログインすると<a href="terms.html" target="_blank">利用規約</a>と<a href="privacy.html" target="_blank">プライバシーポリシー</a>に同意したことになります。', ko: '로그인하면 <a href="terms.html" target="_blank">이용약관</a>과 <a href="privacy.html" target="_blank">개인정보처리방침</a>에 동의하는 것입니다.' },
    'auth.sign_out':      { en: 'Sign Out',                           zh: '退出登录',          ja: 'ログアウト',                ko: '로그아웃' },
    'auth.manage_sub':    { en: 'Manage Subscription',                zh: '管理订阅',          ja: 'サブスクリプション管理',    ko: '구독 관리' },
    'auth.pro_badge':     { en: 'PRO',                                zh: '专业版',            ja: 'PRO',                       ko: 'PRO' },
    'auth.free_badge':    { en: 'Free',                               zh: '免费版',            ja: '無料',                      ko: '무료' },
    'auth.upgrade_btn':   { en: 'Upgrade',                            zh: '升级',              ja: 'アップグレード',            ko: '업그레이드' },

    // ── Toast / Messages ──
    'toast.select_model': { en: 'Please select at least one model to compare', zh: '请至少选择一个模型进行对比', ja: '比較するモデルを少なくとも1つ選択してください', ko: '비교할 모델을 하나 이상 선택해주세요' },

    // ── Category labels ──
    'cat.flagship':  { en: 'Flagship',   zh: '旗舰',    ja: 'フラッグシップ', ko: '플래그십' },
    'cat.small':     { en: 'Small/Fast', zh: '小型',    ja: '小型/高速',      ko: '소형' },
    'cat.reasoning': { en: 'Reasoning',  zh: '推理',    ja: '推論',           ko: '추론' },
    'cat.turbo':     { en: 'Turbo',      zh: 'Turbo',  ja: 'Turbo',          ko: 'Turbo' },
    'cat.legacy':    { en: 'Legacy',     zh: '旧版',    ja: '旧バージョン',   ko: '레거시' },

    // ── Provider labels ──
    'provider.meta_label': { en: 'Meta (via Together/Replicate)', zh: 'Meta (通过 Together/Replicate)', ja: 'Meta (Together/Replicate経由)', ko: 'Meta (Together/Replicate 경유)' },

    // ── Blog cards ──
    'blog.tag.analysis': { en: 'Analysis', zh: '分析',   ja: '分析',   ko: '분석' },
    'blog.tag.guide':    { en: 'Guide',    zh: '指南',   ja: 'ガイド', ko: '가이드' },
    'blog.tag.news':     { en: 'News',     zh: '新闻',   ja: 'ニュース', ko: '뉴스' },
    'blog.tag.tutorial': { en: 'Tutorial', zh: '教程',   ja: 'チュートリアル', ko: '튜토리얼' },
    'blog.tag.strategy': { en: 'Strategy', zh: '策略',   ja: '戦略',   ko: '전략' },
    'blog.read_time':    { en: 'min read', zh: '分钟阅读', ja: '分で読了', ko: '분 읽기' },

    // ── Blog posts ──
    'blog.post1.title':   { en: 'GPT-4o vs Claude Sonnet 4: 2026 Pricing Showdown',         zh: 'GPT-4o vs Claude Sonnet 4：2026 年价格对决', ja: 'GPT-4o vs Claude Sonnet 4：2026年価格対決', ko: 'GPT-4o vs Claude Sonnet 4: 2026년 가격 대결' },
    'blog.post1.excerpt': { en: 'A detailed price-performance comparison of the two flagship models. Which gives you more intelligence per dollar in May 2026?',
                              zh: '两大旗舰模型的详细性价比对比。2026年5月，每一美元能买到多少智能？',
                              ja: '2大フラッグシップモデルの詳細な価格性能比較。2026年5月、1ドルでどれだけの知能が得られるか？',
                              ko: '두 플래그십 모델의 상세한 가격 대비 성능 비교. 2026년 5월, 1달러로 얼마나 많은 지능을 얻을 수 있을까요?' },
    'blog.post2.title':   { en: 'How We Cut AI Costs by 87% Switching from GPT-4 to DeepSeek V3', zh: '我们如何通过从 GPT-4 迁移到 DeepSeek V3 降低 87% AI 成本', ja: 'GPT-4からDeepSeek V3への移行でAIコストを87%削減した方法', ko: 'GPT-4에서 DeepSeek V3로 전환하여 AI 비용을 87% 절감한 방법' },
    'blog.post2.excerpt': { en: 'Real production data from a SaaS company that migrated 200K daily API calls. The strategy, the trade-offs, and the results.',
                              zh: '一家 SaaS 公司迁移 20 万次日 API 调用的真实生产数据。策略、权衡和结果。',
                              ja: '1日20万回のAPI呼び出しを移行したSaaS企業の実運用データ。戦略、トレードオフ、そして結果。',
                              ko: '일일 20만 건의 API 호출을 마이그레이션한 SaaS 기업의 실제 운영 데이터. 전략, 절충점, 그리고 결과.' },
    'blog.post3.title':   { en: 'Google Slashes Gemini 2.5 Pro Pricing — What It Means for the Market', zh: 'Google 大幅降低 Gemini 2.5 Pro 定价 — 对市场意味着什么', ja: 'GoogleがGemini 2.5 Proの価格を大幅値下げ — 市場への影響', ko: 'Google, Gemini 2.5 Pro 가격 대폭 인하 — 시장에 미치는 영향' },
    'blog.post3.excerpt': { en: 'Google just made its flagship model significantly cheaper. This reshapes the competitive landscape for enterprise AI adoption.',
                              zh: 'Google 大幅降低旗舰模型价格，重塑企业 AI 部署的竞争格局。',
                              ja: 'Googleがフラッグシップモデルを大幅に値下げ。企業AI導入の競争環境を再構築。',
                              ko: 'Google이 플래그십 모델을 크게 저렴하게 만들었습니다. 기업 AI 도입의 경쟁 구도를 재편합니다.' },
    'blog.post4.title':   { en: 'Token Economics 101: Understanding Input vs Output Costs',     zh: 'Token 经济学 101：理解输入与输出成本', ja: 'トークン経済学101：入力と出力のコストを理解する', ko: '토큰 경제학 101: 입력과 출력 비용 이해하기' },
    'blog.post4.excerpt': { en: 'A beginner-friendly guide to how AI token pricing works, why output costs more, and how to structure prompts for savings.',
                              zh: '零基础也能看懂：AI Token 定价机制、为什么输出更贵、以及如何设计 Prompt 来省钱。',
                              ja: '初心者向け：AIトークン料金の仕組み、出力が高い理由、コスト削減のためのプロンプト設計法。',
                              ko: '초보자도 이해할 수 있는 AI 토큰 가격 책정 방식, 출력 비용이 더 비싼 이유, 비용 절감을 위한 프롬프트 설계 방법.' },
    'blog.post5.title':   { en: 'The Rise of Cheap Reasoning: DeepSeek R1 vs o3-mini Cost Analysis', zh: '廉价推理的崛起：DeepSeek R1 vs o3-mini 成本分析', ja: '安価な推論の台頭：DeepSeek R1 vs o3-mini コスト分析', ko: '저렴한 추론의 부상: DeepSeek R1 vs o3-mini 비용 분석' },
    'blog.post5.excerpt': { en: 'Both models excel at math and coding. But one costs 12x less. Is the premium for o3-mini worth it?',
                              zh: '两个模型都擅长数学和编程。但其中一个便宜 12 倍。o3-mini 的溢价值得吗？',
                              ja: '両モデルとも数学とコーディングに優れています。しかし、一方は12倍安い。o3-miniのプレミアムは価値があるか？',
                              ko: '두 모델 모두 수학과 코딩에 뛰어납니다. 하지만 하나는 12배 저렴합니다. o3-mini의 프리미엄은 가치가 있을까요?' },
    'blog.post6.title':   { en: 'Multi-Model Architecture: Using Different Models for Different Tasks', zh: '多模型架构：不同任务用不同模型', ja: 'マルチモデルアーキテクチャ：タスクごとに異なるモデルを使用', ko: '멀티 모델 아키텍처: 작업별로 다른 모델 사용하기' },
    'blog.post6.excerpt': { en: 'Why the smartest AI teams don\'t use one model for everything. A practical guide to model routing by task type.',
                              zh: '为什么最聪明的 AI 团队不只用一种模型。按任务类型路由模型的实用指南。',
                              ja: '最も賢いAIチームが1つのモデルですべてを処理しない理由。タスクタイプ別モデルルーティングの実践ガイド。',
                              ko: '가장 똑똑한 AI 팀이 하나의 모델로 모든 것을 처리하지 않는 이유. 작업 유형별 모델 라우팅 실용 가이드.' },
  },

  /** Get translated string */
  t(key) {
    const entry = I18N.strings[key];
    if (!entry) return key;
    return entry[I18N.current] || entry.en;
  },

  /** Switch language and re-render the page */
  setLang(lang) {
    I18N.current = lang;
    localStorage.setItem('tokenCostLang', lang);
    if (lang === 'zh') document.documentElement.lang = 'zh-CN';
    else if (lang === 'ja') document.documentElement.lang = 'ja';
    else if (lang === 'ko') document.documentElement.lang = 'ko';
    else document.documentElement.lang = 'en';
    I18N.render();
  },

  /** Render all i18n-bound elements on the page */
  render() {
    // Update elements with data-i18n attribute
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.dataset.i18n;
      el.textContent = I18N.t(key);
    });

    // Update placeholder attributes
    document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
      el.placeholder = I18N.t(el.dataset.i18nPlaceholder);
    });

    // Update title attributes
    document.querySelectorAll('[data-i18n-title]').forEach(el => {
      el.title = I18N.t(el.dataset.i18nTitle);
    });

    // Update HTML content (for rich text spans)
    document.querySelectorAll('[data-i18n-html]').forEach(el => {
      const key = el.dataset.i18nHtml;
      const text = I18N.t(key);
      // Handle <span> and <a> inline tags
      el.innerHTML = text
        .replace(/&lt;span&gt;/g, '<span class="tooltip" data-tip="">')
        .replace(/&lt;\/span&gt;/g, '</span>')
        .replace(/&lt;a&gt;/g, '<a href="#" style="color:var(--accent-blue);">')
        .replace(/&lt;\/a&gt;/g, '</a>');
    });

    // Update table headers
    document.querySelectorAll('[data-i18n-th]').forEach(el => {
      el.textContent = I18N.t(el.dataset.i18nTh);
    });

    // Update lang switcher buttons
    document.querySelectorAll('.lang-switch-btn').forEach(btn => {
      btn.classList.toggle('active', btn.dataset.lang === I18N.current);
    });

    // Re-render dynamic content
    if (typeof renderTable === 'function') filterTable();
    if (typeof initBundles === 'function') initBundles();
    if (typeof initBlog === 'function') initBlog();

    // Broadcast to any listeners
    document.dispatchEvent(new CustomEvent('i18n:changed', { detail: { lang: I18N.current } }));
  }
};

// Initialize on load
document.addEventListener('DOMContentLoaded', () => {
  const saved = localStorage.getItem('tokenCostLang') || 'en';
  I18N.setLang(saved);
});
