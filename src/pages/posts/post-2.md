---
title: Жизненный цикл компонента React
date: 2020-05-05
path: /post-2
image: ../../images/circle.png
tags: 
- React
---

Всё в мире следует циклу. К примеру, люди рождаются -> учатся, работают, женятся -> умирают.
Компоненты React тоже имеют жизненный цикл, который делится на 3 стадии: **Mounting**, **Update**, **Unmounting**.

Понимание методов жизненого цикла - один из ключевых моментов в работе с React.

Итак:

 Mounting - инициализация компонента.<br>
 Update - обновление компонента.<br>
 Unmounting - удаление компонента.<br>

Для взаимодействия с компонентом на определенной стадии, существуют методы жизненного цикла:

* **constructor**
* **getDerivedStateFromProps**
* **shouldComponentUpdate**
* **render**
* **getSnapshotBeforeUpdate**
* **componentDidMount**
* **componentDidUpdate**
* **componentWillUnmount**

Некоторые методы( например, статичные getDerivedStateFromProps, getSnapshotBeforeUpdate) используются довольно редко.
Чаще всего приходится иметь дело:
* **constructor**
* **render**
* **componentDidMount**
* **componentDidUpdate**
* **componentWillUnmount**

Как известно, компоненты в React бывают двух типов: Классы и Функции. 
Выше перечисленные методы относятся к Классам.
В целом названия методов говорят сами за себя( mount, update, unmount). 

**constructor** - это метод, где объявляется стейт компонента и привязываются(bind) функции.

**componentDidMount** - этот метод вызвается после render(), когда компонент запускается в первый раз. Здесь можно делать запросы, подписываться на события или обновить стейт, после чего произойдет еще 1 render().

**render** - единственный обязателньый метод в класс компоненте. Функция render должна быть чистой,то есть всегда возвращать 1 и тот же результат. Обычно render возвращает html.

**componentDidUpdate** - метод запускается при каждом обновлении компонента(в отличие от componentDidMount, который запускается 1 раз), его целесообразно использовать когда нужно произвести манупулиции с DOM в ответ на изменения в state или props. При вызове setState обязатательно нужно обернуть его в условие, чтобы избежать бесконечного цикла обновлений и ререндера.

**componentWillUnmount** - метод вызывается при удалении компонента. Здесь можно подчистить за собой, уничтожить таймеры или отменить подписки и сетевые запросы ( [ подробнее...](https://developer.mozilla.org/ru/docs/Web/API/AbortController/abort ))

## Пример
Реализация методов жизненного цикла в класс компоненте ( **LifecicleClass** ) и в функциональном компоненте( **LifecycleFunc** ).


При инициализации компонента загружается случайная картинка с unsplash.
Клик на кнопку Count обновляет значение Count на 1 и вызовает метод componentDidUpdate.

Для демонстрации метода componentWillUnmount, в родительском классе App.js можно отключить компонент по клику на кнопку toggle

**App.js**

```javascript
  function App() {
  const [show, setShow] = useState(true);

  const toggle = () =>{
    setShow(!show)
  }
  return (
    <div className="App">
      {
        show && <LifecicleFunc />
      }
      {
        show && <LifecicleClass />
      }
      <button onClick={toggle}>Toggle component</button>
    </div>
  );
}
```
<br/>

**LifecicleClass.js** <br />

```javascript
export class LifecicleClass extends Component {
  
  constructor(props) {
   super(props) 
   this.state = {
     count:0,
     img:''
    }
  }
  componentDidMount(){
   console.log('Class component mounted!');
   fetch('https://source.unsplash.com/random')
   .then( res =>{
      this.setState({img:res.url})
   })
  }
  componentDidUpdate(){
   console.log(' Class component updated!'); 
  }
  componentWillUnmount(){
    console.log('Class component unmounted!');
  }

  render() {
    return (
      <div>
        <h1>Class Component</h1>
        <h2>{this.state.count}</h2>
        <img src={this.state.img} alt='' style={{width:'200px'}} />
        <button onClick={()=>this.setState({count:this.state.count+1})} >Count</button>
      </div>
    )
  }
}
```
<br/>

Тоже самое, но в функциональном компоненте с использованием хуков *useState* и *useEffect* <br/>

**LifecicleFunc.js**
```javascript
function LifecicleFunc() {
  const [img, setImg] = useState('');
  const [count, setCount] = useState(0);
  useEffect(() =>{
        console.log('Effect runs');
        fetch('https://source.unsplash.com/random')
        .then( res =>{
          setImg(res.url)
        })
        return ()=>{
          console.log('Function component unmounted');
        }
  }, [])  
  return (
    <div>
      <h1>Functional component</h1>
      <h1>{count}</h1>
      <img src={img} alt='' style={{width:'200px'}} />
      <button onClick={()=>setCount(count+1)}>Count</button>
     </div>
  )
}
```
<br/>

Хук **useEffect** заменяет собой **componentDidMount**, **componentDidUpdate** и **componentWilUnmount**.<br> 
**useEffect** принимает 2 параметра - функцию и массив зависимостей. В данном случае массив пустой, таким образом **useEffect** запускается 1 раз и картинка не будет загружаться снова при клике на кнопку или любом другом обновлении компонента. Если не передавать второй параметр, то useEfecct будет запускаться постоянно. Для выполнения аналога **componentWillUnmount** в **useEffect** нужно вернуть функцию.

---
Таким образом, с помощью методов жизненого цикла, можно управлять обновлением компонента, перезаписывать состояние, инициализировать запросы API и заниматься оптимизацией. 