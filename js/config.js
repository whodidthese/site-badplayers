const AppConfig = {
    // 待更新
    links: {
        appStore: "#",
        github: "#",
        issues: "#"
    },
    images: {
        // logo: "https://placehold.co/512x512/000000/FFFFFF/png?text=Badplayers",
        logo: "./assets/images/logo_512x512.png",
        screenshotEn: "./assets/images/ss-en.jpg",
        screenshotZh: "./assets/images/ss-zh.jpg",
        screenshotKo: "./assets/images/ss-ko.jpg",
        screenshotJa: "./assets/images/ss-ja.jpg",
        background: "./assets/images/background_2912x1632.jpg"
    },
    i18n: {
        en: {
            app: {
                title: "Badplayers",
                subtitle: "Simple player for focus, workout & sleep",
                download: "Download on the App Store"
            },
            hero: {
                slogan: "Reclaim your music and your focus."
            },
            features: [
                {
                    title: "Pure Offline Playback",
                    desc: "Import MP3s and various audio formats directly from the Files app. No internet required, no ads, just your music."
                },
                {
                    title: "Seamless Background Play",
                    desc: "Full support for Lock Screen controls and background playback. Your focus remains unbroken even when the screen is off."
                },
                {
                    title: "Designed for Focus & Sleep",
                    desc: "A minimalist interface designed to keep you distraction-free while learning languages on your commute or drifting off to sleep."
                },
                {
                    title: "Privacy First",
                    desc: "We promise zero data collection. Your playlists and files stay 100% on your device."
                }
            ],
            why: {
                title: "Why Badplayers?",
                content: "In an era dominated by streaming algorithms and ads, Badplayers brings back the purity of your listening experience. We believe your playlist should be curated by you, not an AI. Whether for language learning, workout sessions, or white noise for sleep, Badplayers is your most loyal offline companion."
            },
            footer: {
                copyright: "© 2026 Badplayers. All rights reserved.",
                privacy: "Privacy Policy",
                support: "Support"
            }
        },
        zh: {
            app: {
                title: "Badplayers",
                subtitle: "陪伴你專注學習、激勵運動、平靜睡眠的最簡單音訊播放器",
                download: "App Store 下載"
            },
            hero: {
                slogan: "把音樂與專注，還給自己。"
            },
            features: [
                {
                    title: "極致純粹的離線播放",
                    desc: "支援從「檔案」App 匯入 MP3 與多種音訊格式。不需網路，沒有廣告，只有您的音樂。"
                },
                {
                    title: "完美的背景播放體驗",
                    desc: "支援鎖定畫面控制與背景播放。即使關閉螢幕，您的專注力也不會中斷。"
                },
                {
                    title: "專為學習與睡眠設計",
                    desc: "簡約的介面設計，讓您在通勤學習語言、或睡前播放白噪音時，不被繁雜的介面干擾。"
                },
                {
                    title: "隱私至上",
                    desc: "我們承諾不收集任何使用者數據。您的播放列表、您的檔案，永遠只存在於您的裝置中。"
                }
            ],
            why: {
                title: "為什麼選擇 Badplayers？",
                content: "在這個充斥著廣告與演算法推薦的串流時代，Badplayers 為您找回最純粹的聆聽體驗。我們相信，您的播放列表應該由您親手打造，而不是由 AI 決定。無論是為了語言學習、健身運動，還是睡前的白噪音，Badplayers 都是您最忠實的離線夥伴。"
            },
            footer: {
                copyright: "© 2026 Badplayers. All rights reserved.",
                privacy: "隱私權政策",
                support: "技術支援"
            }
        },
        ja: {
            app: {
                title: "Badplayers",
                subtitle: "集中、ワークアウト、睡眠のためのシンプルなオフライン音楽プレーヤー",
                download: "App Store でダウンロード"
            },
            hero: {
                slogan: "音樂と集中力を、自分の手に。"
            },
            features: [
                {
                    title: "純粋なオフライン再生",
                    desc: "「ファイル」アプリからMP3や様々なオーディオ形式を直接インポート。インターネット不要、広告なし、あなたの音楽だけを。"
                },
                {
                    title: "シームレスなバックグラウンド再生",
                    desc: "ロック画面のコントロールとバックグラウンド再生を完全サポート。画面をオフにしても、集中力は途切れません。"
                },
                {
                    title: "集中と睡眠のためのデザイン",
                    desc: "通勤中の語学学習や就寝前のリラックスタイムに最適な、邪魔にならないミニマルなインターフェース。"
                },
                {
                    title: "プライバシー第一",
                    desc: "ユーザーデータの収集は一切行いません。プレイリストやファイルは100%デバイス内に保持されます。"
                }
            ],
            why: {
                title: "なぜ Badplayers なのか？",
                content: "ストリーミングのアルゴリズムや広告に支配された現代において、Badplayers は純粋なリスニング体験を取り戻します。プレイリストはAIではなく、あなた自身が選ぶべきだと信じています。語学学習、ワークアウト、または睡眠のためのホワイトノイズ。Badplayers はあなたの最も忠実なオフラインのパートナーです。"
            },
            footer: {
                copyright: "© 2026 Badplayers. All rights reserved.",
                privacy: "プライバシーポリシー",
                support: "サポート"
            }
        },
        ko: {
            app: {
                title: "Badplayers",
                subtitle: "집중, 운동, 수면을 위한 심플한 오프라인 음악 플레이어",
                download: "App Store에서 다운로드"
            },
            hero: {
                slogan: "음악과 집중력을 다시 당신의 것으로."
            },
            features: [
                {
                    title: "순수한 오프라인 재생",
                    desc: "'파일' 앱에서 MP3 및 다양한 오디오 형식을 직접 가져옵니다. 인터넷 연결도, 광고도 없이 오직 당신의 음악만 즐기세요."
                },
                {
                    title: "끊김 없는 백그라운드 재생",
                    desc: "잠금 화면 제어 및 백그라운드 재생을 완벽하게 지원합니다. 화면이 꺼져도 당신의 집중력은 중단되지 않습니다."
                },
                {
                    title: "집중과 수면을 위한 디자인",
                    desc: "출퇴근 시간의 언어 학습이나 잠들기 전 화이트 노이즈 재생 시 방해받지 않도록 설계된 미니멀한 인터페이스."
                },
                {
                    title: "개인정보 보호 우선",
                    desc: "어떠한 데이터도 수집하지 않을 것을 약속합니다. 당신의 플레이리스트와 파일은 100% 당신의 기기에만 저장됩니다."
                }
            ],
            why: {
                title: "왜 Badplayers인가요?",
                content: "스트리밍 알고리즘과 광고가 넘쳐나는 시대에, Badplayers는 듣는 경험의 순수함을 되찾아줍니다. 우리는 당신의 플레이리스트가 AI가 아닌 당신에 의해 만들어져야 한다고 믿습니다. 언어 학습, 운동 시간, 수면을 위한 화이트 노이즈까지, Badplayers는 당신의 가장 충실한 오프라인 동반자가 될 것입니다."
            },
            footer: {
                copyright: "© 2026 Badplayers. All rights reserved.",
                privacy: "개인정보 처리방침",
                support: "고객 지원"
            }
        }
    }
};
