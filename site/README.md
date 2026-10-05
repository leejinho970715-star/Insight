# 애니어그램 인사이트

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

사용자가 임시 데이터로 제공한 연락처 010-4049-2697, 이메일 leejinho970715@gmail.com, 대표 이은규, 서울시 강서구 화곡본동, 협의회 전문 강사, 10회 강연, 《애니어그램으로 알아보는 내 자신》 집필을 반영했습니다. 강사 인사말·교육과 강연 설명은 초안입니다. 강연별 실제 일정·주최기관을 임의로 만들지 않았고, 책 표지는 CSS로 만든 콘셉트이며 실제 출간 정보가 아닙니다.

`dist/app.js`에서 사이트 소개와 연락처·강사·책 내용을 수정하고, `dist/data.js`에서 동물 유형과 문항을 수정할 수 있습니다. 각 페이지의 HTML 제목과 설명도 함께 확인해주세요.

## 에셋

`dist/assets/hero-transparent.png`, `animal-1.png` ~ `animal-9.png`, `logo-3d.png`, `og-image.png`는 built-in image_gen으로 생성했습니다. 비주얼·개별 동물·로고는 알파 투명 배경입니다. `image-prompts.txt`와 `supplemental-image-prompts.txt`에 전체 프롬프트를 기록했습니다. 3D 로고를 32px·192px 파비콘과 180px 터치 아이콘으로 내보냈습니다. 6개 페이지에 Open Graph 이미지, 제목·설명과 X 카드 메타데이터를 적용했습니다. `node build-pages.mjs` 또는 `node update-branding.mjs`로 정적 페이지 메타데이터를 갱신할 수 있습니다.

GSAP로 동물마다 서로 다른 주기의 위아래 움직임과 기울임, 카드 호버 반응, 스크롤 등장과 비주얼 패럴랙스를 적용했습니다. 메인 비주얼 아래 브랜드 섹션은 화면에 고정된 상태에서 작은 로고를 확대·회전해 안착시키고, 이후 내용이 등장한 다음 다음 섹션으로 이어집니다. 텍스트에는 슬라이드·클립·회전 효과가, 카드에는 확대·이동 효과가 적용되며 돌아오는 스크롤에도 재생합니다. 화면 밖의 반복 애니메이션은 일시 정지하고, 운영체제의 움직임 줄이기 설정에서는 고정 스크롤을 포함한 애니메이션을 생략합니다. 외부 실행 라이브러리와 폰트는 로컬 assets에 보관해 외부 CDN 연결 없이 사이트가 동작합니다.

동물 대응은 1 소, 2 강아지, 3 독수리, 4 고양이, 5 부엉이, 6 사슴, 7 원숭이, 8 호랑이, 9 코끼리입니다. 국내에서 사용하는 동물 비유를 참고했으며 국제적으로 하나의 공인 동물 대응표가 있다는 뜻은 아닙니다. 참고: https://luxoracle.co.kr/ennea

ABOUT의 자기 발견·공감·함께 성장 아이콘과 교육·강연·메일·전화·주소·대표자 3D 아이콘은 직접 생성했습니다. 추가 프롬프트는 `about-icons-prompts.txt`, `page-icons-prompts.txt`, 수정 동물과 그룹·공유 이미지 프롬프트는 `corrected-animal-prompts.txt`에 기록했습니다. 버튼은 `dist/refinements.css`의 공통 색·높이·모서리·호버 스타일을 사용합니다.

## GitHub Pages 배포

https://leejinho970715-star.github.io/Insight/

루트 저장소의 `main` 푸시 시 GitHub Actions에서 `node build-pages.mjs`, `node verify.mjs`를 실행하고 `site/dist`를 배포합니다. HTML 리소스와 CSS 폰트 경로는 상대 경로이며 앱 라우팅은 앱 모듈의 위치에서 기본 경로를 계산하므로 `/Insight/`와 로컬 `/`에서 모두 동작합니다. 보조 이름은 ‘애니어그램 협의회’입니다.

교육 페이지 역사 참고: https://www.enneagraminstitute.com/the-traditional-enneagram/

글꼴 원본: https://github.com/orioncactus/pretendard (SIL Open Font License)

라이브러리: https://gsap.com/ · https://github.com/niklasvh/html2canvas · https://github.com/parallax/jsPDF
