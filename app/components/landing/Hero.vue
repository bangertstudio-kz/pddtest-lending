<template>
  <section class="hero">
    <div class="copy">
      <div class="kicker">Теория ПДД · Казахстан, Россия, Беларусь, Узбекистан</div>
      <h1>Сдай теорию с первого раза.</h1>
      <p class="lead">
        Официальные билеты, экзамен с таймером как в спецЦОНе и разбор каждой ошибки. Выбери страну и категорию —
        остальное приложение посчитает само.
      </p>
      <LandingStoreButtons id="download" />
      <div class="fine">5 тем бесплатно · без карты</div>
    </div>
    <div class="phones">
      <PhoneFrame><PhoneAppScreen screen="home" /></PhoneFrame>
      <PhoneFrame class="lower"><PhoneAppScreen screen="wrong" /></PhoneFrame>
    </div>
  </section>
</template>

<style scoped>
.hero {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(min(100%, 420px), 1fr));
  align-items: end;
  gap: 48px;
  max-width: 1400px;
  margin: 0 auto;
  padding: clamp(40px, 7vw, 96px) var(--gutter) 0;
}
.copy {
  display: flex;
  flex-direction: column;
  gap: 24px;
  padding-bottom: clamp(24px, 5vw, 72px);
}
.kicker {
  color: var(--acc);
  font-size: 12px;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  font-weight: 600;
}
h1 {
  font-size: clamp(44px, 7vw, 96px);
  line-height: 0.95;
  letter-spacing: -0.035em;
  text-wrap: balance;
}
.lead {
  max-width: 520px;
  color: var(--mut);
  font-size: clamp(17px, 1.6vw, 20px);
  line-height: 1.45;
  text-wrap: pretty;
}
#download {
  scroll-margin-top: 24px;
}
.fine {
  color: var(--mut);
  font-size: 13px;
}
.phones {
  display: flex;
  gap: 20px;
  overflow: hidden;
}
.lower {
  margin-top: 64px;
}
</style>
