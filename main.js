
//商品信息
var allGoods = [
    {
        id: 1,
        name: "工藤新一",
        price: 125
    },
    {
        id: 2,
        name: "高木警官",
        price: 86
    },
    {
        id: 3,
        name: "毛利小五郎",
        price: 230
    },
    {
        id: 4,
        name: "怪盗基德",
        price: 403
    }
]

//购物车商品
var goodsInCart = [];

//商品展示列表
Vue.component("showGoods", {
    props: ["goods"],
    template: `
        <li class="showGoods">
            <p>名称：{{ goods.name }}</p>
            <span>￥{{ goods.price }}</span>
            <button @click="putInCart">加入购物车</button>
        </li>
    `,
    methods:{
        putInCart: function() {
            if(goodsInCart.indexOf(this.goods) === -1) {
                Vue.set(this.goods, "amount", 1);
                Vue.set(this.goods, "selected", true);
                goodsInCart.push(this.goods)
            }
            else {
                this.goods.amount++
            }
        }
    }
})

new Vue({
    el: "#goodsUl",
    data: {
        allGoods
    }
})

//加入购物车

Vue.component("putInCart", {
    props: ["goods"],
    template: `
        <tr class="goodsInCart">
            <td><input type="checkbox" v-model="goods.selected"></td>
            <td>{{ goods.name }}</td>
            <td class="amountChange">
                <button @click="goods.amount>1 ? goods.amount-- : null">-</button>
                <span>{{ goods.amount }}</span>
                <button @click="goods.amount++">+</button>
            </td>
            <td>￥{{ goods.price }}</td>
            <td>￥{{ goods.amount * goods.price }}</td>
            <td><button @click="deleteButton">删除</button></td>
        </tr>
    `,
    methods: {
        //删除购物车中的商品
        deleteButton: function() {
            goodsInCart.splice(goodsInCart.indexOf(this.goods),1)
        }
    }
})

new Vue({
    el: "#cartTable",
    data: {
        goodsInCart
    },
    computed: {
        //全选
        selectAllSelected: {
            get: function() {
                if(this.goodsInCart.length){
                    return this.goodsInCart.every(function(arr) {
                        return arr.selected
                    })
                }
                else {
                    return false
                }
            },
            set: function(checked) {
                for(let i=0; i<this.goodsInCart.length; i++) {
                    this.goodsInCart[i].selected = checked
                }
            }
        },
        //总计数量和金额
        totalAmount: function() {
            var quantity = 0;
            var amount = 0;
            var selectedArr = this.goodsInCart.filter(function(goods) {
                return goods.selected
            })
            for(let i=0; i<selectedArr.length; i++) {
                quantity += selectedArr[i].amount
                amount += selectedArr[i].amount*selectedArr[i].price
            }
            return [quantity, amount]
        }
    },
    methods: {
        //删除已选
        deleteSelected: function() {
            goodsInCart = this.goodsInCart.filter(function(goods) {
                return !goods.selected
            })
            this.goodsInCart = goodsInCart;
        }
    }
})


