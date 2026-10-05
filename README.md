# 에니어그램 인사이트 · 에니어그램 협의회

사이트: https://leejinho970715-star.github.io/Insight/

Vercel: https://insight-psi.vercel.app/

프로젝트 소스와 배포 파일은 `site/`에 있습니다. `site` 폴더에서 `node server.mjs`로 로컬 미리보기를 시작합니다. `node build-pages.mjs`로 6개 페이지의 메타데이터를 생성하고 `node verify.mjs`로 검증합니다.

`main`에 푸시하면 `.github/workflows/pages.yml`에서 검증 후 GitHub Pages를 자동 배포합니다. 정적 산출물은 `site/dist`이며 별도 패키지 설치가 필요하지 않습니다. 페이지별 세부 내용과 임시 콘텐츠 안내는 `site/README.md`에 있습니다.

Vercel은 `vercel.json`에서 프레임워크를 Other로 지정하고 `node site/build-vercel.mjs`로 빌드한 `site/dist`를 정적으로 제공합니다. 프로젝트의 Root Directory가 `site`인 경우에는 `site/vercel.json`의 동일한 설정을 사용합니다. Vercel용 빌드는 해당 도메인의 공유 메타데이터를 생성하고 검증합니다. `server.mjs`는 로컬 미리보기 전용입니다.
