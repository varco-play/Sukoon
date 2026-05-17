'use client'

import { useState, useRef, useEffect } from 'react'
import Link from 'next/link'

// ─── TYPES ─────────────────────────────────────────────────────────
interface Chapter     { id: string; label: string }
interface ChapterMeta { title: string; subtitle: string }
interface MenuItem    { id: number; chapter: string; sub: string; name: string; price: number }

// ─── FILTER CHAPTERS ───────────────────────────────────────────────
const CHAPTERS: Chapter[] = [
  { id: 'all',      label: 'Всё меню'    },
  { id: 'european', label: 'Европейский' },
  { id: 'eastern',  label: 'Восточный'   },
  { id: 'panasian', label: 'Паназия'     },
  { id: 'oven',     label: 'Из Печи'     },
  { id: 'grill',    label: 'Гриль'       },
  { id: 'sides',    label: 'Гарниры'     },
  { id: 'drinks',   label: 'Напитки'     },
]

const CHAPTER_META: Record<string, ChapterMeta> = {
  european: { title: 'Европейский Сет',     subtitle: 'Гастрономические хиты Европы и безупречная техника исполнения' },
  eastern:  { title: 'Восточный Сет',       subtitle: 'Классика, приготовленная по канонам' },
  panasian: { title: 'Паназия и Дары Моря', subtitle: 'Гармония стихий. Смелые азиатские акценты' },
  oven:     { title: 'Из Печи',             subtitle: 'Ароматная выпечка, объединяющая колорит Италии, Кавказа и Востока' },
  grill:    { title: 'Искусство Огня',      subtitle: 'Традиции открытого пламени' },
  sides:    { title: 'Гарниры и Хлеб',      subtitle: 'Неотъемлемая часть вашей трапезы' },
  drinks:   { title: 'Оазис Sukoon',         subtitle: 'Барная карта — горячее и холодное' },
}

// ─── MENU DATA — 153 позиции из PDF ────────────────────────────────
const MENU: MenuItem[] = [
  // ── ЕВРОПЕЙСКИЙ ──────────────────────────────────────────────────
  { id: 1,  chapter: 'european', sub: 'Стартеры',          name: 'Брускетта с чесночным соусом',          price: 39000  },
  { id: 2,  chapter: 'european', sub: 'Стартеры',          name: 'Брускетта с грибами',                   price: 41000  },
  { id: 3,  chapter: 'european', sub: 'Стартеры',          name: 'Дзадзики',                              price: 41000  },
  { id: 4,  chapter: 'european', sub: 'Стартеры',          name: 'Брускетта с томатами и оливками',        price: 43000  },
  { id: 5,  chapter: 'european', sub: 'Горячие закуски',   name: 'Сырные палочки',                        price: 69000  },
  { id: 6,  chapter: 'european', sub: 'Горячие закуски',   name: 'Куриные наггетсы',                      price: 89000  },
  { id: 7,  chapter: 'european', sub: 'Салаты',            name: 'Салат «Смак»',                          price: 45000  },
  { id: 8,  chapter: 'european', sub: 'Салаты',            name: 'Салат «Французский»',                   price: 49000  },
  { id: 9,  chapter: 'european', sub: 'Салаты',            name: 'Салат «Оливье»',                        price: 65000  },
  { id: 10, chapter: 'european', sub: 'Салаты',            name: 'Салат «Мужской каприз»',                price: 77000  },
  { id: 11, chapter: 'european', sub: 'Салаты',            name: 'Салат «Греческий»',                     price: 79000  },
  { id: 12, chapter: 'european', sub: 'Салаты',            name: 'Салат «Каприз»',                        price: 79000  },
  { id: 13, chapter: 'european', sub: 'Салаты',            name: 'Цезарь с курицей',                      price: 79000  },
  { id: 14, chapter: 'european', sub: 'Салаты',            name: 'Цезарь с креветками',                   price: 89000  },
  { id: 15, chapter: 'european', sub: 'Салаты',            name: 'Салат с говядиной',                     price: 92000  },
  { id: 16, chapter: 'european', sub: 'Салаты',            name: 'Салат с бурратой',                      price: 99000  },
  { id: 17, chapter: 'european', sub: 'Первые блюда',      name: 'Чечевичный суп',                        price: 49000  },
  { id: 18, chapter: 'european', sub: 'Первые блюда',      name: 'Грибной суп',                           price: 49000  },
  { id: 19, chapter: 'european', sub: 'Первые блюда',      name: 'Домашний суп с цыпленком',               price: 50000  },
  { id: 20, chapter: 'european', sub: 'Первые блюда',      name: 'Борщ',                                  price: 65000  },
  { id: 21, chapter: 'european', sub: 'Первые блюда',      name: 'Суп с фрикадельками',                   price: 65000  },
  { id: 22, chapter: 'european', sub: 'Паста',             name: 'Паста «Альфредо» с грибами',            price: 89000  },
  { id: 23, chapter: 'european', sub: 'Паста',             name: 'Паста «Болоньезе»',                     price: 92000  },
  { id: 24, chapter: 'european', sub: 'Паста',             name: 'Паста «Карбонара»',                     price: 96000  },
  { id: 25, chapter: 'european', sub: 'Паста',             name: 'Паста с креветками',                    price: 129000 },
  { id: 26, chapter: 'european', sub: 'Паста',             name: 'Паста с цукини',                        price: 99000  },
  { id: 27, chapter: 'european', sub: 'Мясо и птица',      name: 'Рубленая котлета из цыпленка',          price: 59000  },
  { id: 28, chapter: 'european', sub: 'Мясо и птица',      name: 'Бургер на мангале',                     price: 69000  },
  { id: 29, chapter: 'european', sub: 'Мясо и птица',      name: 'Фирменная говяжья котлета',             price: 79000  },
  { id: 30, chapter: 'european', sub: 'Мясо и птица',      name: 'Курица карри',                          price: 89000  },
  { id: 31, chapter: 'european', sub: 'Мясо и птица',      name: 'Запеченная телятина по-французски',     price: 99000  },
  { id: 32, chapter: 'european', sub: 'Мясо и птица',      name: 'Жареный картофель по-домашнему',        price: 129000 },
  { id: 33, chapter: 'european', sub: 'Мясо и птица',      name: 'Язык говяжий в сливочном соусе',        price: 149000 },
  { id: 34, chapter: 'european', sub: 'Мясо и птица',      name: 'Медальоны в сливочном соусе',           price: 180000 },
  { id: 35, chapter: 'european', sub: 'Мясо и птица',      name: 'Медальон «Каприз»',                     price: 189000 },
  { id: 36, chapter: 'european', sub: 'Мясо и птица',      name: 'Медальон «Мексика»',                    price: 195000 },
  { id: 37, chapter: 'european', sub: 'Мясо и птица',      name: 'Классик стейк',                         price: 199000 },
  { id: 38, chapter: 'european', sub: 'Мясо и птица',      name: 'Т-бон стейк',                           price: 209000 },
  { id: 39, chapter: 'european', sub: 'Мясо и птица',      name: 'Рибай-стейк',                           price: 215000 },
  // ── ВОСТОЧНЫЙ ────────────────────────────────────────────────────
  { id: 40, chapter: 'eastern',  sub: 'Первые блюда',      name: 'Мастава',                               price: 69000  },
  { id: 41, chapter: 'eastern',  sub: 'Первые блюда',      name: 'Кайнатма шурпа',                        price: 70000  },
  { id: 42, chapter: 'eastern',  sub: 'Первые блюда',      name: 'Уйгурский лагман',                      price: 70000  },
  { id: 43, chapter: 'eastern',  sub: 'Основные блюда',    name: 'Манты',                                 price: 49000  },
  { id: 44, chapter: 'eastern',  sub: 'Основные блюда',    name: 'Палов',                                 price: 69000  },
  { id: 45, chapter: 'eastern',  sub: 'Основные блюда',    name: 'Куриный сай с овощами',                 price: 69000  },
  { id: 46, chapter: 'eastern',  sub: 'Основные блюда',    name: 'Жареный лагман',                        price: 75000  },
  { id: 47, chapter: 'eastern',  sub: 'Основные блюда',    name: 'Долма',                                 price: 79000  },
  { id: 48, chapter: 'eastern',  sub: 'Основные блюда',    name: 'Куриный козон-кабоб',                   price: 89000  },
  { id: 49, chapter: 'eastern',  sub: 'Основные блюда',    name: 'Козон-кабоб',                           price: 129000 },
  // ── ПАНАЗИЯ ──────────────────────────────────────────────────────
  { id: 50, chapter: 'panasian', sub: 'Салаты и супы',     name: 'Салат с хрустящим баклажаном',          price: 89000  },
  { id: 51, chapter: 'panasian', sub: 'Салаты и супы',     name: 'Салат с тунцом',                        price: 89000  },
  { id: 52, chapter: 'panasian', sub: 'Салаты и супы',     name: 'Том Ям',                                price: 139000 },
  { id: 53, chapter: 'panasian', sub: 'Горячие блюда',     name: 'Мясо по-китайски',                      price: 89000  },
  { id: 54, chapter: 'panasian', sub: 'Горячие блюда',     name: 'Креветки в соусе «Динамит»',            price: 149000 },
  { id: 55, chapter: 'panasian', sub: 'Горячие блюда',     name: 'Филе судака',                           price: 219000 },
  { id: 56, chapter: 'panasian', sub: 'Горячие блюда',     name: 'Филе лосося',                           price: 219000 },
  // ── ИЗ ПЕЧИ ──────────────────────────────────────────────────────
  { id: 57, chapter: 'oven',     sub: 'Из печи',           name: 'Хачапури по-аджарски',                  price: 68000  },
  { id: 58, chapter: 'oven',     sub: 'Из печи',           name: 'Пицца «Маргарита»',                     price: 75000  },
  { id: 59, chapter: 'oven',     sub: 'Из печи',           name: 'Пицца «Пепперони»',                     price: 88000  },
  { id: 60, chapter: 'oven',     sub: 'Из печи',           name: 'Пицца «Четыре сыра»',                   price: 89000  },
  { id: 61, chapter: 'oven',     sub: 'Из печи',           name: 'Пицца «Нью-Йорк»',                      price: 86000  },
  { id: 62, chapter: 'oven',     sub: 'Из печи',           name: 'Пицца Мексиканская',                    price: 99000  },
  { id: 63, chapter: 'oven',     sub: 'Из печи',           name: 'Пицца куриная',                         price: 91000  },
  { id: 64, chapter: 'oven',     sub: 'Из печи',           name: 'Пицца с тунцом',                        price: 119000 },
  { id: 65, chapter: 'oven',     sub: 'Из печи',           name: 'Пиде с мясной начинкой',                price: 95000  },
  { id: 66, chapter: 'oven',     sub: 'Из печи',           name: 'Пиде с сырной начинкой',                price: 85000  },
  // ── ГРИЛЬ ────────────────────────────────────────────────────────
  { id: 67, chapter: 'grill',    sub: 'Шашлыки',           name: 'Шашлык грибной',                        price: 21000  },
  { id: 68, chapter: 'grill',    sub: 'Шашлыки',           name: 'Шашлык куриный (крылышки) 120 г',       price: 29000  },
  { id: 69, chapter: 'grill',    sub: 'Шашлыки',           name: 'Шашлык «Гиждуван» с фаршем 150 г',      price: 39000  },
  { id: 70, chapter: 'grill',    sub: 'Шашлыки',           name: 'Шашлык куриный (бедро) 120 г',          price: 29000  },
  { id: 71, chapter: 'grill',    sub: 'Шашлыки',           name: 'Овощной шашлык',                        price: 29000  },
  { id: 72, chapter: 'grill',    sub: 'Шашлыки',           name: 'Шашлык бараний 300 г',                  price: 99000  },
  { id: 73, chapter: 'grill',    sub: 'Шашлыки',           name: 'Шашлык из говядины 120 г',              price: 47000  },
  { id: 74, chapter: 'grill',    sub: 'Шашлыки',           name: 'Куриный стейк на углях',                price: 79000  },
  { id: 75, chapter: 'grill',    sub: 'Шашлыки',           name: 'Шашлык-рулет 200 г',                    price: 79000  },
  { id: 76, chapter: 'grill',    sub: 'Шашлыки',           name: 'Баранья корейка',                       price: 179000 },
  { id: 77, chapter: 'grill',    sub: 'Ассорти',           name: 'Шашлычное ассорти на 8–10 персон',      price: 799000 },
  { id: 78, chapter: 'grill',    sub: 'Ассорти',           name: 'Мясное ассорти на 8–10 персон',         price: 999000 },
  // ── ГАРНИРЫ ──────────────────────────────────────────────────────
  { id: 79, chapter: 'sides',    sub: 'Гарниры',           name: 'Овощи на гриле',                        price: 29000  },
  { id: 80, chapter: 'sides',    sub: 'Гарниры',           name: 'Картофельное пюре',                     price: 29000  },
  { id: 81, chapter: 'sides',    sub: 'Гарниры',           name: 'Рис',                                   price: 29000  },
  { id: 82, chapter: 'sides',    sub: 'Гарниры',           name: 'Айдахо',                                price: 29000  },
  { id: 83, chapter: 'sides',    sub: 'Гарниры',           name: 'Картофель Фри',                         price: 29000  },
  { id: 84, chapter: 'sides',    sub: 'Хлебная корзина',   name: 'Лепёшка',                               price: 15000  },
  { id: 85, chapter: 'sides',    sub: 'Хлебная корзина',   name: 'Белый хлеб',                            price: 15000  },
  { id: 86, chapter: 'sides',    sub: 'Хлебная корзина',   name: 'Чёрный хлеб',                           price: 15000  },
  { id: 87, chapter: 'sides',    sub: 'Хлебная корзина',   name: 'Хлебное ассорти',                       price: 35000  },
  // ── НАПИТКИ ──────────────────────────────────────────────────────
  { id: 88,  chapter: 'drinks',  sub: 'Кофе',              name: 'Эспрессо',                              price: 29000  },
  { id: 89,  chapter: 'drinks',  sub: 'Кофе',              name: 'Кофе Американо',                        price: 29000  },
  { id: 90,  chapter: 'drinks',  sub: 'Кофе',              name: 'Капучино',                              price: 32000  },
  { id: 91,  chapter: 'drinks',  sub: 'Кофе',              name: 'Двойной эспрессо',                      price: 39000  },
  { id: 92,  chapter: 'drinks',  sub: 'Кофе',              name: 'Двойной Американо',                     price: 39000  },
  { id: 93,  chapter: 'drinks',  sub: 'Кофе',              name: 'Латте',                                 price: 39000  },
  { id: 94,  chapter: 'drinks',  sub: 'Кофе',              name: 'Флэт Уайт',                             price: 42000  },
  { id: 95,  chapter: 'drinks',  sub: 'Кофе',              name: 'Какао',                                 price: 47000  },
  { id: 96,  chapter: 'drinks',  sub: 'Кофе',              name: 'Раф',                                   price: 49000  },
  { id: 97,  chapter: 'drinks',  sub: 'Кофе',              name: 'Двойной капучино',                      price: 49000  },
  { id: 98,  chapter: 'drinks',  sub: 'Кофе',              name: 'Капучино на кокосовом молоке',           price: 49000  },
  { id: 99,  chapter: 'drinks',  sub: 'Кофе',              name: 'Горячий шоколад',                       price: 49000  },
  { id: 100, chapter: 'drinks',  sub: 'Кофе',              name: 'Латте на кокосовом молоке',              price: 50000  },
  { id: 101, chapter: 'drinks',  sub: 'Кофе',              name: 'Матча Латте',                            price: 55000  },
  { id: 102, chapter: 'drinks',  sub: 'Кофе',              name: 'Двойной капучино на кокосовом молоке',  price: 59000  },
  { id: 103, chapter: 'drinks',  sub: 'Кофе',              name: 'Флэт Уайт на кокосовом молоке',         price: 59000  },
  { id: 104, chapter: 'drinks',  sub: 'Чай',               name: 'Зелёный чай',                           price: 30000  },
  { id: 105, chapter: 'drinks',  sub: 'Чай',               name: 'Чёрный чай',                            price: 30000  },
  { id: 106, chapter: 'drinks',  sub: 'Чай',               name: 'Чёрный чай «Эрл Грей»',                 price: 32000  },
  { id: 107, chapter: 'drinks',  sub: 'Чай',               name: 'Чёрный чай с лимоном',                  price: 37000  },
  { id: 108, chapter: 'drinks',  sub: 'Чай',               name: 'Зелёный чай с лимоном',                 price: 37000  },
  { id: 109, chapter: 'drinks',  sub: 'Чай',               name: 'Жасминовый чай',                        price: 43000  },
  { id: 110, chapter: 'drinks',  sub: 'Чай',               name: 'Молочный улун',                         price: 43000  },
  { id: 111, chapter: 'drinks',  sub: 'Авторский чай',     name: 'Чай «Маракуйя и Малина»',               price: 50000  },
  { id: 112, chapter: 'drinks',  sub: 'Авторский чай',     name: 'Чай Имбирь-Мёд',                        price: 52000  },
  { id: 113, chapter: 'drinks',  sub: 'Авторский чай',     name: 'Чай Облепиховый',                       price: 55000  },
  { id: 114, chapter: 'drinks',  sub: 'Авторский чай',     name: 'Чай Ягодный',                           price: 55000  },
  { id: 115, chapter: 'drinks',  sub: 'Авторский чай',     name: 'Чай Марокканский',                      price: 55000  },
  { id: 116, chapter: 'drinks',  sub: 'Авторский чай',     name: 'Чай Имбирь-Малина',                     price: 56000  },
  { id: 117, chapter: 'drinks',  sub: 'Авторский чай',     name: 'Чай Маракуйя-Апельсин',                 price: 58000  },
  { id: 118, chapter: 'drinks',  sub: 'Свежевыжатые соки', name: 'Яблочный фреш',                         price: 46000  },
  { id: 119, chapter: 'drinks',  sub: 'Свежевыжатые соки', name: 'Морковный фреш',                        price: 46000  },
  { id: 120, chapter: 'drinks',  sub: 'Свежевыжатые соки', name: 'Свекольный фреш',                       price: 46000  },
  { id: 121, chapter: 'drinks',  sub: 'Свежевыжатые соки', name: 'Фреш свекла-морковь',                   price: 49000  },
  { id: 122, chapter: 'drinks',  sub: 'Свежевыжатые соки', name: 'Детокс Авокадо-Банан',                  price: 62000  },
  { id: 123, chapter: 'drinks',  sub: 'Свежевыжатые соки', name: 'Детокс Манго-Яблоко',                   price: 64000  },
  { id: 124, chapter: 'drinks',  sub: 'Свежевыжатые соки', name: 'Детокс Киви-Банан',                     price: 65000  },
  { id: 125, chapter: 'drinks',  sub: 'Свежевыжатые соки', name: 'Фреш апельсиновый',                     price: 70000  },
  { id: 126, chapter: 'drinks',  sub: 'Айс-кофе',          name: 'Кофе тоник',                            price: 39000  },
  { id: 127, chapter: 'drinks',  sub: 'Айс-кофе',          name: 'Айс Американо',                         price: 42000  },
  { id: 128, chapter: 'drinks',  sub: 'Айс-кофе',          name: 'Айс латте',                             price: 42000  },
  { id: 129, chapter: 'drinks',  sub: 'Айс-кофе',          name: 'Милкшейк',                              price: 49000  },
  { id: 130, chapter: 'drinks',  sub: 'Айс-кофе',          name: 'Фраппучино',                            price: 49000  },
  { id: 131, chapter: 'drinks',  sub: 'Айс-кофе',          name: 'Айс латте на кокосовом молоке',         price: 50000  },
  { id: 132, chapter: 'drinks',  sub: 'Айс-кофе',          name: 'Кофе Аффогато',                         price: 50000  },
  { id: 133, chapter: 'drinks',  sub: 'Айс-кофе',          name: 'Айс Латте Матча',                       price: 60000  },
  { id: 134, chapter: 'drinks',  sub: 'Айс-кофе',          name: 'Бамбл',                                 price: 65000  },
  { id: 135, chapter: 'drinks',  sub: 'Лимонады',          name: 'Мохито (стакан)',                        price: 40000  },
  { id: 136, chapter: 'drinks',  sub: 'Лимонады',          name: 'Мохито (графин)',                        price: 135000 },
  { id: 137, chapter: 'drinks',  sub: 'Лимонады',          name: 'Лимонад Тархун (стакан)',                price: 42000  },
  { id: 138, chapter: 'drinks',  sub: 'Лимонады',          name: 'Лимонад Тархун (графин)',                price: 152000 },
  { id: 139, chapter: 'drinks',  sub: 'Лимонады',          name: 'Голубая лагуна (стакан)',                price: 43000  },
  { id: 140, chapter: 'drinks',  sub: 'Лимонады',          name: 'Голубая лагуна (графин)',                price: 144000 },
  { id: 141, chapter: 'drinks',  sub: 'Лимонады',          name: 'Ягодный лимонад (стакан)',               price: 45000  },
  { id: 142, chapter: 'drinks',  sub: 'Лимонады',          name: 'Ягодный лимонад (графин)',               price: 143000 },
  { id: 143, chapter: 'drinks',  sub: 'Лимонады',          name: 'Айсти (стакан)',                         price: 45000  },
  { id: 144, chapter: 'drinks',  sub: 'Лимонады',          name: 'Айсти (графин)',                         price: 147000 },
  { id: 145, chapter: 'drinks',  sub: 'Лимонады',          name: 'Лимонад Киви (стакан)',                  price: 45000  },
  { id: 146, chapter: 'drinks',  sub: 'Лимонады',          name: 'Манго-Маракуйя (стакан)',                price: 48000  },
  { id: 147, chapter: 'drinks',  sub: 'Лимонады',          name: 'Манго-Маракуйя (графин)',                price: 152000 },
  { id: 148, chapter: 'drinks',  sub: 'Освежающие',        name: 'Кола 0,25',                              price: 20000  },
  { id: 149, chapter: 'drinks',  sub: 'Освежающие',        name: 'Фанта 0,25',                             price: 20000  },
  { id: 150, chapter: 'drinks',  sub: 'Освежающие',        name: 'Спрайт 0,25',                            price: 20000  },
  { id: 151, chapter: 'drinks',  sub: 'Освежающие',        name: 'Редбулл 0,25',                           price: 39000  },
  { id: 152, chapter: 'drinks',  sub: 'Освежающие',        name: 'Чорток 0,5',                             price: 39000  },
  { id: 153, chapter: 'drinks',  sub: 'Освежающие',        name: 'Боржоми 0,5',                            price: 49000  },
]

// ─── HELPERS ───────────────────────────────────────────────────────
const fmt = (n: number) => n.toLocaleString('ru-RU') + ' сум'

function getItems(chapterId: string) {
  return MENU.filter(i => i.chapter === chapterId)
}

function getSubs(chapterId: string): string[] {
  const seen = new Set<string>()
  return getItems(chapterId).reduce<string[]>((acc, i) => {
    if (!seen.has(i.sub)) { seen.add(i.sub); acc.push(i.sub) }
    return acc
  }, [])
}

// ─── CARD ──────────────────────────────────────────────────────────
function MenuCard({ item, index }: { item: MenuItem; index: number }) {
  return (
    <article className="sm-card" style={{ animationDelay: `${(index % 16) * 35}ms` }}>
      <span className="sm-card-sub">{item.sub}</span>
      <h3 className="sm-card-name">{item.name}</h3>
      <div className="sm-card-div" />
      <span className="sm-card-price">{fmt(item.price)}</span>
    </article>
  )
}

// ─── CSS — Sukoon brand tokens, no Google Fonts import ─────────────
const CSS = `
  /* fonts come from layout.tsx via CSS vars — no @import needed */

  .sm-page {
    min-height: 100vh;
    background: #080F08;
    color: #F5F0E8;
    font-family: var(--font-dm-sans, system-ui, sans-serif);
  }

  /* ── HERO ── */
  .sm-hero {
    position: relative;
    padding: 160px 24px 80px;
    text-align: center;
    background: linear-gradient(180deg, #0F1F0F 0%, #080F08 100%);
    overflow: hidden;
  }
  .sm-hero::before {
    content: '';
    position: absolute;
    inset: 0;
    background: radial-gradient(ellipse 60% 40% at 50% 25%, rgba(201,168,76,0.07) 0%, transparent 70%);
    pointer-events: none;
  }
  .sm-hero-eyebrow {
    font-size: 11px;
    font-weight: 400;
    letter-spacing: 4px;
    text-transform: uppercase;
    color: #C9A84C;
    margin-bottom: 20px;
    position: relative;
  }
  .sm-hero-title {
    font-family: var(--font-cormorant, Georgia, serif);
    font-size: clamp(52px, 9vw, 96px);
    font-weight: 300;
    line-height: 1.0;
    color: #F5F0E8;
    position: relative;
  }
  .sm-hero-diamond {
    display: block;
    color: #C9A84C;
    font-size: 15px;
    letter-spacing: 12px;
    margin: 22px auto;
    position: relative;
  }
  .sm-hero-sub {
    font-size: 13px;
    font-weight: 300;
    letter-spacing: 0.8px;
    color: #B8AFA0;
    line-height: 1.8;
    margin-bottom: 28px;
    position: relative;
  }
  .sm-hero-pdf {
    display: inline-block;
    font-size: 10px;
    font-weight: 400;
    letter-spacing: 2.5px;
    text-transform: uppercase;
    color: #B8AFA0;
    text-decoration: none;
    border-bottom: 1px solid rgba(201,168,76,0.3);
    padding-bottom: 3px;
    transition: color 0.2s, border-color 0.2s;
    position: relative;
  }
  .sm-hero-pdf:hover { color: #C9A84C; border-color: #C9A84C; }

  /* ── STICKY FILTER BAR ── */
  .sm-bar-outer {
    position: sticky;
    top: 64px;
    z-index: 40;
    background: rgba(8,15,8,0.97);
    backdrop-filter: blur(16px);
    border-bottom: 1px solid #1C3A1C;
  }
  .sm-bar {
    display: flex;
    overflow-x: auto;
    scrollbar-width: none;
    padding: 0 16px;
    max-width: 1100px;
    margin: 0 auto;
  }
  .sm-bar::-webkit-scrollbar { display: none; }
  .sm-tab {
    flex-shrink: 0;
    padding: 16px 20px;
    font-family: var(--font-dm-sans, system-ui, sans-serif);
    font-size: 10px;
    font-weight: 400;
    letter-spacing: 2.5px;
    text-transform: uppercase;
    color: #B8AFA0;
    cursor: pointer;
    border: none;
    background: none;
    border-bottom: 1px solid transparent;
    transition: color 0.25s, border-color 0.25s;
    white-space: nowrap;
  }
  .sm-tab:hover { color: #F5F0E8; }
  .sm-tab-on { color: #C9A84C !important; border-bottom-color: #C9A84C !important; }

  /* ── CONTENT WRAPPER ── */
  .sm-content {
    max-width: 1100px;
    margin: 0 auto;
    padding: 0 16px 100px;
  }

  /* ── CHAPTER BLOCK ── */
  .sm-chapter { padding-top: 70px; }
  .sm-ch-head { text-align: center; margin-bottom: 52px; }
  .sm-ch-orn {
    font-size: 11px;
    letter-spacing: 8px;
    color: #9A7A3A;
    margin-bottom: 14px;
  }
  .sm-ch-title {
    font-family: var(--font-cormorant, Georgia, serif);
    font-size: clamp(30px, 5vw, 46px);
    font-weight: 300;
    color: #F5F0E8;
    letter-spacing: 0.04em;
    margin-bottom: 10px;
  }
  .sm-ch-sub {
    font-size: 12px;
    font-weight: 300;
    letter-spacing: 0.5px;
    color: #B8AFA0;
    max-width: 460px;
    margin: 0 auto;
    line-height: 1.7;
  }
  .sm-ch-line {
    width: 56px;
    height: 1px;
    background: linear-gradient(90deg, transparent, #9A7A3A, transparent);
    margin: 18px auto 0;
  }

  /* ── SUBCATEGORY ── */
  .sm-sub { margin-bottom: 40px; }
  .sm-sub-label {
    display: flex;
    align-items: center;
    gap: 12px;
    font-size: 10px;
    font-weight: 500;
    letter-spacing: 3px;
    text-transform: uppercase;
    color: #C9A84C;
    margin-bottom: 18px;
    padding-bottom: 10px;
    border-bottom: 1px solid #1C3A1C;
  }
  .sm-sub-label::before {
    content: '';
    width: 18px;
    height: 1px;
    background: #9A7A3A;
    flex-shrink: 0;
  }

  /* ── CARD GRID ── */
  .sm-grid {
    display: grid;
    grid-template-columns: 1fr;
    gap: 10px;
  }
  @media (min-width: 560px) { .sm-grid { grid-template-columns: repeat(2, 1fr); gap: 12px; } }
  @media (min-width: 860px) { .sm-grid { grid-template-columns: repeat(3, 1fr); gap: 14px; } }
  @media (min-width: 1080px) { .sm-grid { grid-template-columns: repeat(4, 1fr); } }

  /* ── MENU CARD ── */
  .sm-card {
    background: #0F1F0F;
    border: 1px solid #1C3A1C;
    padding: 18px 16px 16px;
    display: flex;
    flex-direction: column;
    gap: 7px;
    transition: border-color 0.25s, background 0.25s, transform 0.25s;
    animation: smFadeUp 0.45s ease both;
    cursor: default;
  }
  @keyframes smFadeUp {
    from { opacity: 0; transform: translateY(14px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  .sm-card:hover {
    border-color: rgba(201,168,76,0.45);
    background: #1C3A1C;
    transform: translateY(-2px);
  }
  .sm-card-sub {
    font-size: 9px;
    font-weight: 500;
    letter-spacing: 2.5px;
    text-transform: uppercase;
    color: #C9A84C;
    opacity: 0.7;
  }
  .sm-card-name {
    font-family: var(--font-cormorant, Georgia, serif);
    font-size: 17px;
    font-weight: 400;
    line-height: 1.3;
    color: #F5F0E8;
    flex: 1;
  }
  .sm-card-div {
    height: 1px;
    background: linear-gradient(90deg, #1C3A1C 60%, transparent);
    margin: 2px 0;
  }
  .sm-card-price {
    font-size: 13px;
    font-weight: 400;
    color: #C9A84C;
    letter-spacing: 0.3px;
    align-self: flex-end;
  }

  /* ── SERVICE NOTE ── */
  .sm-service {
    text-align: center;
    font-size: 11px;
    letter-spacing: 1.5px;
    color: #B8AFA0;
    padding: 28px 0 0;
    opacity: 0.65;
  }

  /* ── CHAPTER SEPARATOR ── */
  .sm-sep {
    height: 1px;
    background: linear-gradient(90deg, transparent, #1C3A1C 30%, #1C3A1C 70%, transparent);
    margin: 20px 0 0;
  }

  /* ── CTA STRIP ── */
  .sm-cta {
    margin-top: 90px;
    padding: 72px 24px;
    text-align: center;
    background: linear-gradient(180deg, #080F08 0%, #0F1F0F 50%, #080F08 100%);
    border-top: 1px solid #1C3A1C;
    border-bottom: 1px solid #1C3A1C;
  }
  .sm-cta-diamond {
    display: block;
    color: #C9A84C;
    font-size: 15px;
    letter-spacing: 10px;
    margin-bottom: 24px;
  }
  .sm-cta-title {
    font-family: var(--font-cormorant, Georgia, serif);
    font-size: clamp(32px, 5vw, 50px);
    font-weight: 300;
    color: #F5F0E8;
    margin-bottom: 12px;
  }
  .sm-cta-sub {
    font-size: 12px;
    font-weight: 300;
    letter-spacing: 1px;
    color: #B8AFA0;
    margin-bottom: 36px;
  }
  .sm-cta-btn {
    display: inline-block;
    padding: 14px 44px;
    border: 1px solid #C9A84C;
    color: #C9A84C;
    font-family: var(--font-dm-sans, system-ui, sans-serif);
    font-size: 11px;
    font-weight: 400;
    letter-spacing: 3px;
    text-transform: uppercase;
    text-decoration: none;
    transition: background 0.3s, color 0.3s;
  }
  .sm-cta-btn:hover { background: #C9A84C; color: #080F08; }
`

// ─── MAIN COMPONENT ────────────────────────────────────────────────
export default function MenuContent() {
  const [activeChapter, setActiveChapter] = useState('all')
  const filterRef = useRef<HTMLDivElement>(null)

  const visibleChapters = activeChapter === 'all'
    ? Object.keys(CHAPTER_META)
    : [activeChapter]

  // Scroll active tab into view on mobile
  useEffect(() => {
    const bar = filterRef.current
    if (!bar) return
    const active = bar.querySelector<HTMLElement>('.sm-tab-on')
    if (active) active.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' })
  }, [activeChapter])

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: CSS }} />

      <div className="sm-page">

        {/* ── HERO ── */}
        <section className="sm-hero">
          <p className="sm-hero-eyebrow">Sukoon Café · Ташкент</p>
          <h1 className="sm-hero-title">Наше Меню</h1>
          <span className="sm-hero-diamond">◆ ◆ ◆</span>
          <p className="sm-hero-sub">
            Авторская кухня, вдохновлённая традициями Востока<br />
            и современной гастрономией
          </p>
          <a className="sm-hero-pdf" href="/menu.pdf" target="_blank" rel="noopener noreferrer">
            Скачать PDF ↓
          </a>
        </section>

        {/* ── FILTER BAR ── */}
        <div className="sm-bar-outer">
          <div className="sm-bar" ref={filterRef}>
            {CHAPTERS.map(ch => (
              <button
                key={ch.id}
                className={`sm-tab${activeChapter === ch.id ? ' sm-tab-on' : ''}`}
                onClick={() => setActiveChapter(ch.id)}
              >
                {ch.label}
              </button>
            ))}
          </div>
        </div>

        {/* ── CONTENT ── */}
        <div className="sm-content">
          {visibleChapters.map((chId, ci) => {
            const meta = CHAPTER_META[chId]
            const subs = getSubs(chId)
            return (
              <section key={chId} className="sm-chapter">

                {/* Chapter header */}
                <div className="sm-ch-head">
                  <p className="sm-ch-orn">◆ ◆ ◆</p>
                  <h2 className="sm-ch-title">{meta.title}</h2>
                  <p className="sm-ch-sub">{meta.subtitle}</p>
                  <div className="sm-ch-line" />
                </div>

                {/* Subcategory sections */}
                {subs.map(sub => {
                  const items = getItems(chId).filter(i => i.sub === sub)
                  return (
                    <div key={sub} className="sm-sub">
                      <p className="sm-sub-label">{sub}</p>
                      <div className="sm-grid">
                        {items.map((item, idx) => (
                          <MenuCard key={item.id} item={item} index={idx} />
                        ))}
                      </div>
                    </div>
                  )
                })}

                {chId === 'european' && (
                  <p className="sm-service">* Обслуживание 15%</p>
                )}

                {ci < visibleChapters.length - 1 && <div className="sm-sep" />}
              </section>
            )
          })}

          {/* ── CTA ── */}
          <div className="sm-cta">
            <span className="sm-cta-diamond">◆</span>
            <h3 className="sm-cta-title">Забронируйте стол</h3>
            <p className="sm-cta-sub">Создайте незабываемый вечер в Sukoon</p>
            <Link href="/reservation" className="sm-cta-btn">
              Забронировать
            </Link>
          </div>
        </div>

      </div>
    </>
  )
}
