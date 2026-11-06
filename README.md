# Структура проекта

```
index.html        главная страница + футер (футер встроен прямо в страницу, без iframe)
css/main.css      стили главной
js/main.js        скрипты главной
images/           ВСЕ картинки сайта, кроме футера — одна плоская папка, без подпапок
footer/
  footer.css      стили футера (все селекторы ограничены #site-footer)
  footer.js       скрипты футера
  photo.jpg       фото в футере (нужно положить)
  BackGround.svg  фон футера (нужно положить)
source-original/  исходные файлы без изменений, для сверки
```

## Картинки

Папка `images/` теперь уже содержит все фото дипломов и сертификатов (63 файла).
Не хватает только фото для блока «Фотоальбом» и пары служебных картинок — положите их в `images/` под такими именами:
`desk.jpg`, `rea-students.jpg`, `ws2016-ploshchadka.jpg`, `ws2016-stol-ekspertov.jpg`, `ws2016-torzhestvo.jpg`,
`ws2018-gruppa-bolshoi-palets.jpg`, `ws2018-gruppa.jpg`, `ws2018-kukhta-diplom.jpg`, `ws2020-oblast-diplomy.jpg`, `embedded-01.webp`.
