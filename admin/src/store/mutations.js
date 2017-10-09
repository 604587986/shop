export default {
    changeCollapseStatus(state) {
        // 改变侧栏展开的状态
        state.sideBarIsCollapse = !state.sideBarIsCollapse
    },
    addNavBarTabTag(state, tabObj) {
        // 添加Tab页标签数据
        let isExist = false // tab页是否已经存在于数据中?
        let index // 存在的情况下,存储对应的index

        // 遍历查找是否存在,同时重置clicked属性
        state.navBarTabTag.forEach((route, itemIndex) => {
            if (route.routeName === tabObj.routeName) {
                isExist = true
                index = itemIndex
            }
            route.clicked = false
        })

        // 不存在的话,存进去
        if (!isExist) {
            state.navBarTabTag.push(tabObj)
        } else {
            // 存在的话,设置它的clicked 为 true
            state.navBarTabTag[index].clicked = true
        }
    },
    deleteNavBarTabTag(state, tabObj) {
        // 遍历,找到特定标签对象,删除
        let curIndex // 记录被删除高亮标签的下标
        state.navBarTabTag.forEach((route, index) => {
            if (route.routeName === tabObj.routeName) {
                state.navBarTabTag.splice(index, 1)
                if (route.clicked) {
                    // 如果当前元素已经是高亮元素,记录下index
                    curIndex = index
                }
            }
        })
        if ((curIndex || curIndex === 0) && state.navBarTabTag.length >= 1) {
            // 被删除的是最后一个元素的话,应该高亮当前最后一个标签
            if (curIndex + 1 > state.navBarTabTag.length) {
                // 改变navBar高亮
                state.navBarTabTag[curIndex - 1].clicked = true
                // 改变sideBar高亮
                state.curNavBarTabTagClicked = state.navBarTabTag[curIndex - 1].routeName
            } else {
                // 高亮别删除元素的后面那个,下标一样
                // 改变navBar高亮
                state.navBarTabTag[curIndex].clicked = true
                // 改变sideBar高亮
                state.curNavBarTabTagClicked = state.navBarTabTag[curIndex].routeName
            }
        }
    },
    changeTabTagClickedStatus(state, tabObj) {
        // 改变当前被点击标签
        state.curNavBarTabTagClicked = tabObj.routeName
        // 改变特定标签的clicked属性
        state.navBarTabTag.forEach(route => {
            if (route.routeName === tabObj.routeName) {
                route.clicked = true
            } else {
                route.clicked = false
            }
        })
    },
    updateCurrentRoutePath(state, path) {
        // 更新当前的路径
        state.curTagPathClicked = path
    },
    closeOther(state) {
        // 关闭其他: 删除其他的标签数据
        state.navBarTabTag = state.navBarTabTag.filter(tagObj => tagObj.clicked)
    },
    closeAll(state) {
        // 关闭所有: 删除所有标签数据
        state.navBarTabTag = []
    }
}
