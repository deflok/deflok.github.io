
export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__inner">
          <div className="footer__col text-left">
            <h3 className="footer__title">Как со мной связаться</h3>
            <p className="footer__text">Контактное лицо: <span>Денис</span></p>
            <p className="footer__text">Заказать услугу: <a href="#"><b>По ссылке</b></a></p>

            <p className="footer__text" style={{ margin: "20px 0 0 0;" }}>© 2018-2023 def-it.ru</p>
          </div>
          <div className="footer__col text-center">
            <h3 className="footer__title">Режим работы</h3>
            <p className="footer__text">Ежедневно: 06:00 - 18:00 МСК</p>
            <a href="#" className="btn">Вверх</a>
          </div>
          <div className="footer__col text-right">
            <h3 className="footer__title">Полезные ссылки</h3>
            <ul className="footer__menu">
              <li><a href="#" className="footer__menu-link">Заказать сайт</a></li>
              <li><a href="#" className="footer__menu-link">Услуги веб-разработчика</a></li>
              <li><a href="#" className="footer__menu-link">Блог веб-разработчика</a></li>
              <li><a href="#" className="footer__menu-link">Карта сайта</a></li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  )
}
