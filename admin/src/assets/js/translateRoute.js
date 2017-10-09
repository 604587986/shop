const routes2 = [{
    path: '/',
    name: 'Home',
    component: Home,
    hasSubMenu: true,
    hasIcon: true,
    hidden: false
}, {
    path: '/test',
    name: 'Test',
    component: Test,
    hasSubMenu: true,
    hasIcon: true,
    hidden: false,
    children: [{
        path: 'test1',
        name: 'Test1',
        component: Test1,
        hasSubMenu: true,
        hasIcon: true,
        hidden: false,
        children: [{
            path: 'test2',
            name: 'Test2',
            component: Test2,
            hasSubMenu: true,
            hasIcon: true,
            hidden: false
        }]
    }]
}]

let tempRoutes = []

const translater = routes => {

    routes.forEach(levelOne => {
        // levelOne 一级
        if (levelOne.hasOwnProperty('children') && levelOne.children.length > 0) {
            levelOne.forEach(levelTwo => {
                // levelTwo 二级
                if (levelTwo.hasOwnProperty('children') && levelTwo.children.length > 0) {
                    levelTwo.forEach(levelThree => {
                        // levelThree 三级
                        levelThree.path = `${levelOne.path}/${levelTwo.path}/${levelThree.path}`
                        tempRoutes.push(levelThree)
                    })
                } else {
                    levelTwo.path = `${levelOne.path}/${levelTwo.path}`
                    tempRoutes.push(levelTwo)
                }
            })
        } else {
            tempRoutes.push(levelOne);
        }
    })

}
translater(routes2)


const test = [{
    path: '/',
    name: 'Home',
    component: Home,
    hasSubMenu: true,
    hasIcon: true,
    hidden: false
}, {
    path: '/test',
    name: 'Test',
    component: Test,
    hasSubMenu: true,
    hasIcon: true,
    hidden: false
}, {
    path: '/test/test1',
    name: 'Test1',
    component: Test1,
    hasSubMenu: true,
    hasIcon: true,
    hidden: false
}, {
    path: '/test/test1/test2',
    name: 'Test2',
    component: Test2,
    hasSubMenu: true,
    hasIcon: true,
    hidden: false
}]
