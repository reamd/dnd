# dnd
![npm install](https://img.shields.io/badge/npm-plastic-green.svg?style=install)
![gulp build](https://img.shields.io/badge/build-plastic-green.svg?style=gulp)
![MIT](https://img.shields.io/packagist/l/doctrine/orm.svg)

## Getting Started

#### 1. Including dnd

**npm install**

``` bash
npm install dnd
```

**Browser**

``` js
<script src="dnd.min.js"></script>
```

#### 2. Usage

**not clone**

```js
Dnd.init({
    items: [
        {
            dom: q('.content .source .liaison')
        },
        {
            dom: q('.content .source .stress')
        },
        {
            dom: q('.content .source .light')
        },
        {
            dom: q('.content .source .up')
        },
        {
            dom: q('.content .source .down')
        }
    ]
})
```

**clone**

```js
Dnd.init({
    clone: true,
    container: '.content',
    subContainer: 'ul.draw',
    items: [
        {
            dom: q('.content .source .liaison'),
            dragType: 'type1'
        },
        {
            dom: q('.content .source .stress'),
            dragType: 'type2'
        },
        {
            dom: q('.content .source .light'),
            dragType: 'type3'
        },
        {
            dom: q('.content .source .up'),
            dragType: 'type4'
        },
        {
            dom: q('.content .source .down'),
            dragType: 'type5'
        }
    ],
    drags: {
        type1: {
            className: 'liaison virtual'
        },
        type2: {
            className: 'stress virtual'
        },
        type3: {
            className: 'light virtual'
        },
        type4: {
            className: 'up virtual'
        },
        type5: {
            className: 'down virtual'
        }
    }
})
```

## dnd method
 Name           | Arguments                                | Description
----------------|------------------------------------------|----------------------------------------
`clone`         | `[Boolean]`                              | default is `false`
`container`     | `[String]` container's className         | default is `body`
`subContainer`  | `[String]` sub container's className     | default is `undefined`
`items`         | `[Array]`  dom draged                    | it's required
`drags`         | `[Object]` according to items dragType   | set up it when existed dragType of items