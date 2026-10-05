# 에니어그램 인사이트

오렌지 톤의 반응형 브랜드 사이트. Pretendard, GSAP + ScrollTrigger와 직접 생성한 전신 3D 클레이 동물 이미지를 사용합니다. 서버·외부 API 없이 동작하는 정적 사이트입니다.

## 로컬 실행

Node.js 설치 후 이 폴더에서 `node server.mjs`를 실행하고 http://127.0.0.1:4173 을 열면 됩니다. 의존성 설치나 빌드가 필요하지 않습니다. 검증은 `node verify.mjs`로 실행합니다.

## 페이지

- `/` : Visual, ABOUT, Business, Contact, Footer
- `/education/` : 에니어 소개·역사, 교육 구성안, FAQ
- `/lectures/` : 강사 인사말, 강연 유형, 10회 강연 소개, 집필 중인 도서
- `/contact/` : 메일·연락처·주소·대표자 정보를 담은 3D 클레이 연락 UI
- `/test/` : 검사 소개, 약 5분, 9유형 × 5문항, 복수 응답
- `/result/?s=222223522&t=7&w=6` : 재현 가능한 공유 결과 예시

## 결과 계산

각 유형의 선택 문장 수(0~5)를 점수로 계산합니다. 대표 유형은 최고 점수 유형이며, 윙은 대표 유형 양옆의 점수를 비교해 정합니다. 1의 양옆은 9와 2, 9의 양옆은 8과 1입니다. 최고 점수가 같거나 양옆 점수가 같으면 결과 페이지에서 직접 선택할 수 있습니다. 기본은 번호가 작은 유형이며 양옆 점수가 모두 0일 때 윙은 잠정 표시임을 알립니다.

비율은 전체 선택 문장 수에 대한 각 유형 점수의 구성비입니다. 소수점 잔여분을 큰 순서로 분배해 합계가 항상 100%가 되도록 합니다. 모든 문장을 선택하지 않은 결과는 만들지 않습니다. 전문 심리검사나 진단이 아닌 자체 작성 문항을 사용하는 자기 탐색 도구입니다.

응답은 해당 브라우저 탭의 sessionStorage에 임시 저장합니다. 서버에는 저장하지 않습니다. 결과 URL에는 9개 유형별 선택 수, 대표 유형과 윙만 들어갑니다. 이름이나 문항별 답변은 포함하지 않습니다.

PNG·PDF 다운로드는 html2canvas와 jsPDF로 생성합니다. 링크 복사, X·Facebook 공유 링크, 지원 기기의 기본 공유 기능을 제공합니다. 실제 SNS 게시나 이메일 전송은 방문자가 해당 앱에서 완료합니다. GitHub Pages 공개 주소로 결과 링크를 공유할 수 있습니다.

## 임시 콘텐츠

사용자가 임시 데이터로 제공한 연락처 010-4049-2697, 이메일 leejinho970715@gmail.com, 대표 이은규, 서울시 강서구 화곡본동, 협의회 전문 강사, 10회 강연, 《에니어그램으로 알아보는 내 자신》 집필을 반영했습니다. 강사 인사말·교육과 강연 설명은 초안입니다. 강연별 실제 일정·주최기관을 임의로 만들지 않았고, 책 표지는 CSS로 만든 콘셉트이며 실제 출간 정보가 아닙니다.

`dist/app.js`에서 사이트 소개와 연락처·강사·책 내용을 수정하고, `dist/data.js`에서 동물 유형과 문항을 수정할 수 있습니다. 각 페이지의 HTML 제목과 설명도 함께 확인해주세요.

## 에셋

`dist/assets/hero-transparent.png`, `animal-1.png` ~ `animal-9.png`, `logo-3d.png`, `og-image.png`는 built-in image_gen으로 생성했습니다. 비주얼·개별 동물·로고는 알파 투명 배경입니다. `image-prompts.txt`와 `supplemental-image-prompts.txt`에 전체 프롬프트를 기록했습니다. 3D 로고를 32px·192px 파비콘과 180px 터치 아이콘으로 내보냈습니다. 6개 페이지에 Open Graph 이미지, 제목·설명과 X 카드 메타데이터를 적용했습니다. `node build-pages.mjs` 또는 `node update-branding.mjs`로 정적 페이지 메타데이터를 갱신할 수 있습니다.

GSAP로 동물마다 서로 다른 주기의 위아래 움직임과 기울임, 카드 호버 반응, 스크롤 등장과 비주얼 패럴랙스를 적용했습니다. 메인 비주얼 아래 브랜드 섹션은 화면에 고정된 상태에서 작은 로고를 확대·회전해 안착시키고, 이후 내용이 등장한 다음 다음 섹션으로 이어집니다. 텍스트에는 슬라이드·클립·회전 효과가, 카드에는 확대·이동 효과가 적용되며 돌아오는 스크롤에도 재생합니다. 화면 밖의 반복 애니메이션은 일시 정지하고, 운영체제의 움직임 줄이기 설정에서는 고정 스크롤을 포함한 애니메이션을 생략합니다. 외부 실행 라이브러리와 폰트는 로컬 assets에 보관해 외부 CDN 연결 없이 사이트가 동작합니다.

동물 대응은 1 소, 2 강아지, 3 독수리, 4 고양이, 5 부엉이, 6 사슴, 7 원숭이, 8 호랑이, 9 코끼리입니다. 국내에서 사용하는 동물 비유를 참고했으며 국제적으로 하나의 공인 동물 대응표가 있다는 뜻은 아닙니다. 참고: https://luxoracle.co.kr/ennea

ABOUT의 자기 발견·공감·함께 성장 아이콘과 교육·강연·메일·전화·주소·대표자 3D 아이콘은 직접 생성했습니다. 추가 프롬프트는 `about-icons-prompts.txt`, `page-icons-prompts.txt`, 수정 동물과 그룹·공유 이미지 프롬프트는 `corrected-animal-prompts.txt`에 기록했습니다. 버튼은 `dist/refinements.css`의 공통 색·높이·모서리·호버 스타일을 사용합니다.

## GitHub Pages 배포

브랜드 로고는 원 위의 아홉 점과 3–6–9 삼각형, 1–4–2–8–5–7 연결을 담은 3D 클레이 상징입니다. `dist/assets/logo-symbol-clean.png`를 헤더·푸터·브랜드 스크롤 섹션·도서 콘셉트·문의·결과 리포트에 사용하고, 파비콘과 터치 아이콘에도 동일한 상징을 적용했습니다. 첨부한 심벌을 built-in image_gen으로 배경 제거한 투명 PNG이며, 최종 편집 프롬프트는 `history-image-prompts.txt`에 저장했습니다. 구조 참고: https://www.enneagraminstitute.com/how-the-enneagram-system-works/

유효한 결과 화면으로 진입하면 `dist/celebration.js`에서 약 4초간 폭죽과 컨페티를 재생합니다. 대표 유형·윙 선택 변경에는 반복하지 않으며, 페이지 전환·탭 숨김 시 정리됩니다. 움직임 줄이기 설정에서는 재생하지 않습니다. 효과 레이어는 결과 리포트 외부에 있어 PNG·PDF에 포함되지 않습니다. ABOUT 카드의 흰색 배경 장식 텍스트는 제거했습니다.

https://leejinho970715-star.github.io/Insight/

루트 저장소의 `main` 푸시 시 GitHub Actions에서 `node build-pages.mjs`, `node verify.mjs`를 실행하고 `site/dist`를 배포합니다. HTML 리소스와 CSS 폰트 경로는 상대 경로이며 앱 라우팅은 앱 모듈의 위치에서 기본 경로를 계산하므로 `/Insight/`와 로컬 `/`에서 모두 동작합니다. 보조 이름은 ‘에니어그램 협의회’입니다.

교육 페이지 역사 참고: https://www.enneagraminstitute.com/the-traditional-enneagram/

교육 연혁은 20세기 초, 1960–1970년대 초, 1970년대, 1994년 이후의 네 장으로 구성됩니다. 충분한 화면 높이에서는 GSAP로 고정한 뒤 스크롤에 따라 이미지와 설명을 전환하며, 짧은 화면에서는 세로 연혁과 등장 모션을 제공합니다. 날짜 버튼으로 직접 이동할 수 있고 움직임 줄이기 설정에서도 모든 내용을 읽을 수 있습니다. 보완 역사 자료: https://drdaviddaniels.com/history-of-the-enneagram-we-know-it-today/ · https://www.internationalenneagram.org/about/the-iea/history-and-founders/

메인 `#types` 섹션은 기존 1–9번 동물 에셋을 사용한 가로 카드 슬라이드입니다. 터치 스와이프, 좌우 방향키, 이전·다음 버튼과 드래그 가능한 게이지 바를 지원합니다. 동물은 사이트의 설명용 상징이며 공식적으로 통일된 유형 상징으로 소개하지 않습니다.

`dist/layout.css`에서 본문 16px / 130%, 세로로 쌓이는 섹션 소개, 블랙 보조 버튼을 공통 적용합니다. 브랜드 워드마크는 insight, 아래에는 에니어그램 협의회만 표시합니다. HTML 메타데이터와 공유 이미지의 철자도 에니어그램으로 통일했습니다.

신규 built-in image_gen 에셋: `dist/assets/history-symbol.png`, `history-system.png`, `history-psychology.png`, `history-community.png`, `logo-symbol-clean.png`, `og-image-corrected.png`. 프롬프트 세트: `history-image-prompts.txt`.

유형 슬라이드는 화면에 보이는 동안 1초마다 한 카드씩 자동 이동하고 마지막 카드에서 처음으로 순환합니다. 호버·키보드 탐색·터치 조작 중에는 잠시 멈추며, 일시정지/재생 버튼을 제공합니다. 카드 영역의 세로 휠은 가로 이동으로 처리하고 양 끝의 바깥 방향 휠은 페이지 스크롤로 이어집니다. 트랙패드의 가로 입력은 그대로 사용합니다. 게이지 바는 현재 위치를 표시하고 클릭·드래그·방향키로 이동할 수 있습니다. 호버에는 오렌지 이미지 배경과 블랙 본문 배경, 밝은 글자색 전환을 적용합니다. 페이지 전환 시 타이머·이벤트·관찰자를 정리하고, 보이지 않는 탭과 화면 밖에서는 자동재생을 멈춥니다. 움직임 줄이기 설정에서는 자동재생을 기본 중지합니다.

강연 소개의 책은 `dist/assets/book-clay.png`라는 투명 3D 클레이 이미지로 교체했습니다. 둥근 오렌지 표지, 두꺼운 크림 페이지, 한글 제목과 인사이트 심벌을 담은 도서 표지 콘셉트입니다. built-in image_gen 프롬프트: `book-clay-prompt.txt`.

교육·강연 문의, 프로그램 상담, PDF 저장·결과 공유, 연락 정보 복사에는 블랙 버튼을 사용합니다. 검사 시작·이미지 저장·주요 메일 문의에는 오렌지를 유지하며 모서리·높이·글꼴·호버 동작은 공통 버튼 스타일을 따릅니다.

글꼴 원본: https://github.com/orioncactus/pretendard (SIL Open Font License)

라이브러리: https://gsap.com/ · https://github.com/niklasvh/html2canvas · https://github.com/parallax/jsPDF
