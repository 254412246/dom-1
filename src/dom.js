//parcel src/index.html
window.dom = {
    create(string) {//用于创建节点
        const container = document.createElement//创建一个元素
            ("template");// 容纳任意元素，不会在页面中显示:template
        container.innerHTML = string.trim();//元素的内容就是我写的内容
        //trim取消2边的空格
        return container.content.firstChild;
    },
    after(node, node2) {//用于新增弟弟，node2放到node的后面
        node.parentNode.insertBefore(node2, node.nextSibling);
        //先找到node的爸爸，把node2查到node的下一个节点的前面
    },
    before(node, node2) {//用于新增哥哥
        node.parentNode.insertBefore(node2, node);
    },
    append(parent, node) {//用与新增儿子
        parent.appendChild(node);
    },
    wrap(node, parent) {//用于新增爸爸
        dom.before(node, parent)//把新增的节点放到之前节点的前面
        dom.append(parent, node)//把之前节点放到新增节点的里面
    },//之前的节点就会消失
    remove(node) {//用于删除节点
        node.parentNode.removeChild(node)
        //让这个节点的上级节点删除子节点
        return node
    },
    empty(node) {//用于删除后代
        //简单的写法,无法获取引用：node.innerHTML = ''
        const array = []
        let x = node.firstChild
        while (x) {
            array.push(dom.remove(node.firstChild))
            x = node.firstChild
        } return array
    },
    attr(node, name, value) {//重载
        if (arguments.length === 3) {
            node.setAttribute(name, value)
        } else if (arguments.length === 2) {
            return node.getAttribute(name)
        }
    },
    text(node, string) {
        if ('innerText' in node) {
            node.innerText = string
        } else {
            node.textContent = string
        }
    },
    html(node, string) {
        node.innerHTML = string
    },
    find(selector, scope) {//获取标签或标签们
        //const testdiv=dom.find('#test')[0]
        return (scope || document).querySelectorAll(selector)
    },
    style(node, name, value) {//修改style
        if (arguments.length === 3) {//div里添加color:red
            // dom.style(div, 'color', 'red')
            node.style[name] = value
        } else if (arguments.length === 2) {
            if (typeof name === 'string') {//获取color元素里东西
                // dom.style(div, 'color')
                return node.style[name]
            } else if (name instanceof Object) {//div里添加color:red
                // dom.style(div, {color: 'red'})
                const object = name
                for (let key in object) {
                    node.style[key] = object[key]
                }
            }
        };
    },
    each(nodeList, fn) {//遍历所有节点
        for (let i = 0; i < nodeList.length; i++) {
            fn.call(null, nodeList[i])
        }
    },
}