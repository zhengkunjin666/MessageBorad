let cardList=[{name:'Jax'},{name:'Joye'},{name:'Jimmy'},{name:'Jay'}];
let backgroundColors=['#f50','#2db7f5','#87d068','#108ee9'];
const PAGE={
    data: {
        backgroundColors: backgroundColors,
        defaultDatas: cardList,
        itemWidth: 100,
        itemHeight: 100,
        paddingOffset: 50,
        zIndex: 0,
        item: null,
        itemOffsetTop: null,
        itemOffsetLeft: null,
        pageX: null,
        pageY: null,
        isLock: true,
    },
    init: function(){
        this.bind();
        this.setDefaultData();
    },
    bind: function(){
        let cardList=document.getElementById('card-list');
        this.onEventLister(cardList,'mousedown','card-item',this.handleMouseDown);
        window.addEventListener('mousemove',this.handleMouseMove);
        window.addEventListener('mouseup',this.handleMouseUp);
    },
    onEventLister: function(parentNode,action,childClassName,callback){
        parentNode.addEventListener(action,function(event){
            event.target.className.indexOf(childClassName)>=0 && callback(event);
        })
    },
    handleMouseDown: function(event){
        let item=event.target;
        item.style.zIndex=++PAGE.data.zIndex;
        PAGE.data.itemOffsetLeft=item.offsetLeft;
        PAGE.data.itemOffsetTop=item.offsetTop;
        PAGE.data.pageX=event.pageX;
        PAGE.data.pageY=event.pageY;
        PAGE.data.item=item;
        PAGE.data.isLock=false;
    },
    handleMouseMove: function(event){
        if(!PAGE.data.isLock){
            let cardList=document.getElementById('card-list');
            let containerWidth=cardList.offsetWidth;
            let containerHeight=cardList.offsetHeight;
            let itemWidth=PAGE.data.itemWidth;
            let itemHeight=PAGE.data.itemHeight;
            let paddingOffset=PAGE.data.paddingOffset;
            let maxWidth=containerWidth-itemWidth-paddingOffset;
            let maxHeight=containerHeight-itemHeight-paddingOffset;
            let translateX=event.pageX-PAGE.data.pageX+PAGE.data.itemOffsetLeft;
            let translateY=event.pageY-PAGE.data.pageY+PAGE.data.itemOffsetTop;
            translateX=translateX>maxWidth ? maxWidth : translateX;
            translateY=translateY>maxHeight ? maxHeight : translateY;
            translateX=translateX<paddingOffset ? paddingOffset : translateX;
            translateY=translateY<paddingOffset ? paddingOffset : translateY;
            PAGE.data.item.style.left=translateX+'px';
            PAGE.data.item.style.top=translateY+'px';
        }
    },
    handleMouseUp: function(){
        PAGE.data.isLock=true;
    },
    setDefaultData: function(){
        PAGE.data.defaultDatas.forEach(data => this.addCard(data.name));
    },
    addCard: function(name){
        let cardList=document.getElementById('card-list');
        let containerWidth=cardList.offsetWidth;
        let containerHeight=cardList.offsetHeight;
        let itemWidth=PAGE.data.itemWidth;
        let itemHeight=PAGE.data.itemHeight;
        let paddingOffset=PAGE.data.paddingOffset;
        let maxWidth=containerWidth-itemWidth-paddingOffset;
        let maxHeight=containerHeight-itemHeight-paddingOffset;
        let itemOffsetLeft=this.randomBetween(maxWidth,paddingOffset);
        let itemOffsetTop=this.randomBetween(maxHeight,paddingOffset);
        let zIndex=++PAGE.data.zIndex;
        let backgroundColor=backgroundColors[zIndex%backgroundColors.length];
        let cardItem=document.createElement('div');
        cardItem.setAttribute('class','card-item');
        cardItem.innerText=name;
        let styleStr=`
            background: ${backgroundColor};
            z-index: ${zIndex};
            left: ${itemOffsetLeft}px;
            top: ${itemOffsetTop}px;
        `;
        cardItem.setAttribute('style',styleStr);
        cardList.appendChild(cardItem);
    },
    randomBetween: function(max,min){
        return Math.floor(Math.random()*(max-min)+min);
    }
}
PAGE.init();