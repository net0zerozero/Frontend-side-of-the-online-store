<template>
    <div class="container">
        <h1>About</h1>
    <div class="divtext">
        <div class="prod">
            <p>Добро пожаловать в наш технический интернет-магазин! Мы - команда увлеченных энтузиастов технологий, стремящихся предоставить вам новейшие и лучшие технические гаджеты и аксессуары. Наша цель - предоставить вам исключительный опыт покупок, от просмотра нашего обширного выбора товаров до получения вашего заказа прямо у вас на пороге. <br> <br>

По сути, мы ценим наших клиентов превыше всего. Мы верим в построение долгосрочных отношений с нашими клиентами, предоставляя первоклассное обслуживание клиентов, быструю доставку и конкурентоспособные цены. Наша компетентная и дружелюбная команда всегда готова помочь вам с любыми вопросами или проблемами, которые у вас могут возникнуть. <br> <br>

Мы стремимся быть в курсе последних технологических тенденций и гарантировать, что наши продукты соответствуют самым высоким стандартам качества. Являетесь ли вы технически подкованным человеком или просто ищете подарок для друга или члена семьи, у нас есть что-то для всех. <br> <br>

Благодарим Вас за то, что выбрали нас в качестве своего интернет-магазина. Мы с нетерпением ждем возможности обслуживать вас и превзойти ваши ожидания.</p>
        </div>
    </div>
    </div>
</template>
<style>
.divtext {
  display: flex;
  justify-content: center ;
  align-items: center;
  margin: 50px;
  padding: 50px;
  max-width: 100%;
  box-sizing: border-box;
  text-align:left;
  font-size: larger;
}
  .prod{
    width: 1500px;
    height: 460px;
    background-color: #030029;
    position: relative;
    border-radius: 8px;
    display: grid;
    place-items: center;
    overflow: hidden;
  }
  .prod p{
    font-family: system-ui;
    font-size: auto;
    color: white;
    text-align: center;
    z-index: 2;
    margin: 10px;
    margin-top: 5px;
  }
  .prod img{
    z-index: 2;
  }
  .prod::before{
    content: '';
    position: absolute;
    width: 350px;
    height: 340%;
    background-image: linear-gradient(
      180deg,
      #865dff,
      #e384ff
    );
    animation: rotate 3s linear infinite;
  }
  .prod::after{
    content: "";
    position: absolute;
    inset: 8px;
    background-color: #030029;
    border-radius: inherit;
  }
  @keyframes rotate{
    100%{
      rotate: 360deg;
    }
  }
</style>