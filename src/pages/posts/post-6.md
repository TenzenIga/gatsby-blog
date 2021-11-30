---
title: Angular pipes. Creating custom pipes
date: 2021-11-23
path: /post-6
image: ../../images/post6/pipe.jpg
tags: 
- Angular
---
В этой статье мы узнаем что такое пайпы в Angular, какие они бывают, для чего нужны и напишем свой кастомный пайп.

## Pipe

Пайпы в Ангуляр служат для трансформации данных на UI. Они пропысываются прямо в html шаблоне. Из под коробки Angular предоставляет множество пайпов - будь то перевод строки из нижнего регистра в верхний, форматирование даты, интернационализация, высчитывание процентов, перевод валюты или даже асинхронные данные( что заслуживает отдельного поста).

Примеры

```js
public currency = 99;
public number: number = 0.23;
public birthday = new Date(1993, 0, 31);
```

html

```html
<p>{{ currency | currency:'EUR' }}</p>
<p>{{ number  | percent}}</p>
<p>{{birthday | date: 'fullDate'}}</p>
```

Результат:

```code
€99.00

23%

Sunday, January 31, 1993
```

Кроме того можно создавать свои собственные пайпы.


## Кастомный пайп DateAgo


Создадим свой пайп *dateAgo*, который, в зависимости от даты, возвращает строку *"Только что/ n мин. назад/ n ч. назад* или просто дату если прошло больше 24 ч. Такое часто можно увидеть во всяких постах и публикациях.

Создать кастомный пайп можно вручную или через команду в cli

```cmd
ng g pipe dateAgo
```

Пайпы бывают двух типов *pure* или *impure*. Нужно помнить, что по умолчанию, пайпы являются pure - от этого зависит как пайп будет реагировать на изменения. Pure pipes не будет отслеживать изменения в объектах( *Date, Array, Function, Object*) - т.к в отличии от примитивов( *String, Number, Boolean, Symbol*), эти типы данных являются ссылочными. Чтобы включить отслеживание изменений в объектах, нужно прописать в декортате  pure: false

```js
   @Pipe({
     name: 'custom'  // название
     pure: false
   })
```

Мы реализуем метод **transform** интерфейса **PipeTransform**. Метод принимает *value* - значение, которое нужно трансформировать и опциональный параметр *args*.

```js
  import { Pipe, PipeTransform } from '@angular/core';

   @Pipe({
     name: 'custom'  // название
   })
   export class CustomPipe implements PipeTransform {
        transform(value: any, args: any[]): any {
           return null;
         }
    }
```

Наш пайп *dateAgo*:

```js
enum Seconds = {
  Minute = 60,
  Hour = 3600,
  Day = 86400
}

@Pipe({
  name: 'dateAgo'
})
export class DateAgoPipe implements PipeTransform {
   transform(value: string): string {
    const createdAtToLocal = (new Date(value)).toString();
    const seconds = (+new Date() - Date.parse(createdAtToLocal)) / 1000;

    if (seconds < Seconds.Day && seconds >= Seconds.Hour ) {
      return  `${Math.floor(seconds / Seconds.Hour)} ч.`;
    }
    if (seconds < Seconds.Hour && seconds >= Seconds.Minute){
      return `${Math.floor(seconds / Seconds.Minute)} мин.`;
    }
    if (seconds <= Seconds.Minute){
      return 'Только что';
    }

    const date = new Date(Date.parse(value));
    const formatter = new Intl.DateTimeFormat('ru', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
    return formatter.format(date);
  }

}

```

Создадим массив дат в **app.component.ts** и используем наш пайп в темплейте:

```ts

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  public dates = [
    new Date().toString(),
    new Date( Date.now() - 1000 * (60 * 5) ).toString(),
    new Date( Date.now() - 1000 * (60 * 60 * 3 )).toString(),
    new Date( 2007, 6, 22).toString()
  ]
}

```

```html
<h3>Dates:</h3>
<ul *ngFor="let d of dates">
  {{d | dateAgo}}
</ul>
```

Результат:

![pipe date ago](../../images/post6/dateago.jpg)

Таким образом один раз создав пайп его можно исрользовать везде, чем-то похоже на обычные функции.
В следующей статье, я подробнее напишу про async pipe.
