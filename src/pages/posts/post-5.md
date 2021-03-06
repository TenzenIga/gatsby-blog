---
title: Debounce и throttle
date: 2020-07-23
path: /post-5
image: ../../images/post5/throttle.png
tags: 
- JavaScript
---
Когда дело касается оптимазации производительности веб приложений, будь то уменьшение числа запросов на сервер или тяжелые вычисления, первыми на ум приходят такие приемы как **Debounce** и **Throttle**. В этой статье мы узнаем что они из себя представляют, чем отличаются друг от друг и напишем каждую из них.
## Debounce
Чтобы понять что такое **debounce**, можно представить поисковик с подсказками, который есть почти на каждом сайте. В этом поисковике, при каждом нажатии клавиатуры, происходит запрос на сервер и возвращается список предложений. Если вдуматься в эту логику, то мы имеем много лишней нагрузки на сервер, ведь обычно человек набирает текст довольно быстро и нет смысла реагировать мгновенно на каждый символ, легче подождать какой-нибудь короткий промежуток времени и если юзер перестает набирать текст в поисковик - сделать запрос. Это и есть **debounce**. 

## Реализация debounce
Многие JS библиотеки такие как **lodash**, **underscore**, **rxjs** предоставлют методы **debounce** и **throttle** с различными дополнительными фишками.
Здесь простая реализиция:

<iframe width="100%" height="300" src="//jsfiddle.net/Zeta162/k0tL7xo1/9/embedded/js,html,result/dark/" allowfullscreen="allowfullscreen" allowpaymentrequest frameborder="0"></iframe>


**Debounce** является функцией высшего порядка, которая принимает 2 аргумента: главную функцию и таймер. 
Каждый запуск функции обновляет таймер, по истечению времени, функция выполняется.

```js
function debounce(func, delay){
        let timer;
        return function(...args){
           clearTimeout(timer)
           timer = setTimeout(() => {
                func(...args)
            }, delay);
        }
    }
```

## Throttle
**Throttle** похож на **debounce**. Но в отличие от второго, сначала выполняется действие, а затем запускается таймер, во время которого функция не будет работать. 

Наглядный пример - кнопка при нажатии которой выполняется запрос на сервер или какие-нибудь тяжелые вычисления. Хорошо бы подстраховаться от случайных нажатий кнопки и лишней нагрузки. Для этого можно запустить таймер, который на время сделает функцию недоступной. Механизм очень схож с кулдаунами заклинаний в играх.

## Реализция Throttle:

<iframe width="100%" height="300" src="//jsfiddle.net/Zeta162/bt0hewop/3/embedded/js,html,result/dark/" allowfullscreen="allowfullscreen" allowpaymentrequest frameborder="0"></iframe>

Подобно **debounce**, функция высшего порядка **throttle** оборачивает привазную к ивенту функцию и таймер. 

```js
function throttle(func, delay){
  let lastTime = 0;
  return function () {
      let now = new Date();
      if (now - lastTime >= delay) {
          func();
          lastTime = now;
      }
  };
}
```

**Throttle** и **Debounce**, также часто используют в ивентах связанных с движениями мышки, resize и scroll.  