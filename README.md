# 애니어그램 인사이트 · 애니어그램 협의회

사이트: https://leejinho970715-star.github.io/Insight/

프로젝트 소스와 배포 파일은 `site/`에 있습니다. `site` 폴더에서 `node server.mjs`로 로컬 미리보기를 시작합니다. `node build-pages.mjs`로 6개 페이지의 메타데이터를 생성하고 `node verify.mjs`로 검증합니다.

`main`에 푸시하면 `.github/workflows/pages.yml`에서 검증 후 GitHub Pages를 자동 배포합니다. 정적 산출물은 `site/dist`이며 별도 패키지 설치가 필요하지 않습니다. 페이지별 세부 내용과 임시 콘텐츠 안내는 `site/README.md`에 있습니다.
