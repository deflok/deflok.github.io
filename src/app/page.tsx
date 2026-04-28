import TypedText from '@/components/ui/TypedText';
import { getLatestProjects, generateSlug } from '@/utils/api';
import type { Project } from '@/utils/api';


export default async function Home() {
  const projects = await getLatestProjects();

  return (
    <>
      <section className="intro">
        <div className="container">
          <div className="intro__inner">
            <div className="intro__title">
              <TypedText />
              <h1>Разработка сайтов - качественно и недорого</h1>
            </div>
            <ul className="intro__list">
              <li>Яркий дизайн и креативность...</li>
              <li>Современные технологии...</li>
              <li>Простота и удобства...</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="services">
        <div className="container">
          <div className="services__inner">
            <div className="services__list">
              
              <a className="services__item" href="#"
                style={{backgroundImage: "url(https://i.pinimg.com/564x/55/43/95/5543956c0baf76903f7791594d231117.jpg);"}}>
                <div className="services__item-content">
                  <div className="services__item-title">Landing page</div>
                  <div className="services__item-subtitle"><span>От</span> 15 000 <span>руб</span></div>
                </div>
              </a>
              
              <a className="services__item" href="#"
                style={{backgroundImage: "url(https://i.pinimg.com/564x/b9/65/d1/b965d157f432b22cbb8e3531abd9f54e.jpg);"}}>
                <div className="services__item-content">
                  <div className="services__item-title">Корпоративный</div>
                  <div className="services__item-subtitle"><span>От</span> 25 000 <span>руб</span></div>
                </div>
              </a>
              
              <a className="services__item" href="#"
                style={{backgroundImage: "url(https://i.pinimg.com/564x/46/51/7c/46517c29ac2f4055e5cbf5b95d6a1b46.jpg);"}}>

                <div className="services__item-content">
                  <div className="services__item-title">Блог</div>
                  <div className="services__item-subtitle"><span>От</span> 15 000 <span>руб</span></div>
                </div>
              </a>

              
              <a className="services__item" href="#"
                style={{backgroundImage: "url(https://i.pinimg.com/564x/6e/f3/92/6ef39211caac84ef98289b098bf9362a.jpg);"}}>
                <div className="services__item-content">
                  <div className="services__item-title">Интернет-магазин</div>
                  <div className="services__item-subtitle"><span>От</span> 30 000 <span>руб</span></div>
                </div>
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="about">
        <div className="container">
          <div className="about__inner">
            <div className="about__col">
              <h2 className="about__title title-md">Добро пожаловать</h2>

              <div className="about__content">
                <p>Меня зовут Денис.</p>
                <p>Я занимаюсь разработкой сайтов более 4-х лет и основная моя специализация:</p>
                <ul>
                  <li>frontend разработка.</li>
                  <li>разработка сайтов на WordPress.</li>
                </ul>
                <p>Если я взялся за разработку Вашего сайта, то он обязательно будет запущен. Всё что Вам нужно - это
                  описать тематику будущего сайта и договорится со мной о сроках выполнения.</p>
              </div>

              <a href="#" className="btn">Услуги разработчика</a>
              <a href="#" className="btn">Портфолио разработчика</a>
              <a href="#" className="btn">Техническая поддержка сайтов</a>
              <a href="#" className="btn">Блог разработчика</a>
            </div>

            <div className="about__col">
              <h4 className="about__subtitle">Приемущества работы со мной</h4>
              <ol className="about__list">
                <li><b>Низкая цена.</b> По причине того, что я работаю один, у меня нет штата сотрудников, которым нужно
                  платить зарплату.</li>
                <li><b>Всегда готов к сотрудничеству</b> и обсуждению возникших задач по первому звонку.</li>
                <li><b>Предоплата не требуется.</b> Моя работа оплачивается поэтапно. Поэтому Вы в любом случае ничем не
                  рискуете.</li>
                <li>Работаю с клиентами по всей <b>России</b>. Готов к личной встрече в любом назначенном месте в <b>г.
                    Благовещенск</b>.</li>
                <li>Работы выполняю <b>под ключ</b> (создание и настройка, миграция на сервер, установка метрики,
                  регистрация в поисковиках и т.д.).</li>
              </ol>
            </div>
          </div>
        </div>
      </section>

      <section className="works">
        <div className="container">
          <div className="works__inner">

            <div className="works__header">
              <h2 className="title-md">Последние работы</h2>
              <a href="/portfolio/" className="works__more btn-more">Портфолио <span>→</span></a>
            </div>

            <div className="works__body">
              {projects.map((project: Project) => (
                <div key={project.id} className="works__item">
                  <a href={`/portfolio/${generateSlug(project.title)}`} className="works__item-full"><span className="fa fa-expand"></span></a>
                  <div className="works__item-image"><img src={project.img} alt="" /></div>
                  <a href="#" className="works__item-title">{project.title}</a>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="reviews">
        <div className="container">
          <div className="reviews__inner">

            <div className="reviews__header">
              <h2 className="title-md">Последние отзывы</h2>
              <a href="#" className="reviews__more btn-more">Отзывы клиентов <span>→</span></a>
            </div>

            <div className="reviews__body">
              <div className="reviews__item">
                <div className="reviews__item-text">
                  <blockquote>
                    <p>Хочу выразить благодарность Денису за его прекрасную работу сделанную в столь короткий срок.</p>
                    <p>Несмотря на кучу нюансов в натяжки сайта Денис выполнил заказ на все 110%. Учел все мои
                      пожелания. Будем работать и дальше! Рекомендую данного специалиста.</p>
                    <p></p>
                    <p></p>
                  </blockquote>
                </div>

                <div className="reviews__item-author">
                  <div className="author-icon">
                    <img src="/img/woman.webp" alt="" />
                  </div>
                  <h3>Ирина</h3>
                  <p>Директор компании</p>
                  <h4>site.ru</h4>
                </div>
              </div>
              <div className="reviews__item _big">
                <div className="reviews__item-text">
                  <blockquote>
                    <p>Была задача посадки дизайна главной страницы из figma на wordpress и к тому же с интеграцией в
                      Elementor. </p>
                    <p>Работа была выполнена очень быстро. </p>
                    <p>Все правки вносились оперативно.</p>
                    <p>Получил результат, который хотел увидеть, и даже чуть больше, так как слегка вышли за рамки ТЗ в
                      процессе правок.</p>
                    <p>Ответственный исполнитель.</p>
                    <p>Работа выполнена качественно.</p>
                  </blockquote>
                </div>

                <div className="reviews__item-author">
                  <div className="author-icon">
                    <img src="img/man.webp" alt="" />
                  </div>
                  <h3>Алексей</h3>
                  <p>Директор компании</p>
                  <h4>site.ru</h4>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
