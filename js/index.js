$(function () {
    var mask = $('.mask').eq(0);
    var wish = $('.region-list').eq(0);
    var wishFiltro = $('.filtro-list').eq(0);
    var province = $('#province');
    var city = $('#city');

    /*
        创建全部地区
     */
    for(var i=0;i<provinceList.length;i++){
        addProvince(province,provinceList[i].name);
    }
    /*
        新建li---省
     */
    function addProvince(province,value) {
        var optionStr="";
        optionStr="<li value="+value+">"+value+"</li>";
        province.append(optionStr);
    }
    /*
        新建div---市
     */
    function addCity(city,value) {
        var optionStr="";
        optionStr="<div class='cityListClass' value="+value+"><span style='display:block;width:100%;float:100%;padding-left: .2rem;'>"+value+"</span></div>";
        city.append(optionStr);
    }
    /*
        新建div---区
     */
    function addCounty(index,value) {
        var cityDiv = $('.cityListClass').eq(index);
        var optionStr="";
        optionStr="<div class='county' style='padding-left: .2rem' value="+value+">"+value+"</div>";
        cityDiv.append(optionStr);
        clickCounty();
    }
    /*
        删除市区
     */
    function removeCity(city){
        city.find('div').remove();
    }
    /*
        删除区
     */
    function removeCounty(){
        var county = $('.county');
        county.remove();
    }
    /*
        新建市插入省中
     */
    var provinceText,cityText,cityItem;
    var provinceLi = $('.province ul li');
    provinceLi.on("click",function(){
        $(this).css('background-color','#fff').siblings().css('background-color','#f2f2f2');
        provinceText=$(this).text();
        $.each(provinceList,function(i,item){
            if(provinceText == item.name){
                cityItem=i;
                return cityItem;
            }
        });
        removeCity(city);
        $.each(provinceList[cityItem].cityList,function(i,item){
            addCity(city,item.name)
        });
    });
    /*
        新建区插入到市中
     */
    function creDiv() {
        var cityDiv = $('.cityListClass');
        cityDiv.on("click",function(){
            if($(this).children('.county').length == 0){
                removeCounty();
                var index = $(this).index();
                cityText=$(this).text();
                $.each(provinceList,function(i,item){
                    if(provinceText == item.name){
                        cityItem=i;
                        return cityItem
                    }
                });
                $.each(provinceList[cityItem].cityList,function(i,item){
                    if(cityText == item.name){
                        for(var n=0;n<item.areaList.length;n++){
                            addCounty(index,item.areaList[n])
                        }
                    }
                });
            }else{
                $(this).children('.county').remove();
            }
        });
    }
    region();
    cityTog();
    filtro();
    clickNature();
    morenAndMore();
    clickMask();
    /*
        点击张开遮罩、关闭遮罩和地区显示隐藏
     */
    function region() {
        var btn = $('.region').eq(0);
        var img = $('.region img');
        var regionList=$('.region-list').eq(0);
        var province = $('#province li');
        btn.on("click",function () {
            if(wish.css('display') === 'none'){
                wish.css('display','flex');
                img.attr('src','./images/down.png');
                regionList.css('z-index',999);
                mask.css('display','block');
                province.css('background-color','#f2f2f2');
                $('.filtro-list').css('display','none')
            }else{
                wish.css('display','none');
                img.attr('src','./images/up.png');
                mask.css('display','none');
            }
        })
    }
    /*
    点击遮罩关闭所有
     */
    function clickMask() {
        $('.mask').on('click',function () {
            $('.filtro-list').css('display','none');
            $('.region-list').css('display','none');
            mask.css('display','none');

        })
    }
    /*
        点击显示市
     */
    function cityTog() {
        var btn = $('.province ul li');
        var wish = $('.city').eq(0);
        btn.on("click",function () {
            if(wish.css('display') === 'none'){
                wish.css('display','flex');
                $(this).css('background-color','#fff').siblings().css('background-color','#f2f2f2');
            }
            creDiv();
        })
    }
    /*
        点击区关闭遮罩并且选定城市
     */
    function clickCounty(){
        var img = $('.region img');
        var county = $('.county');
        var region = $('.region span');
        county.on('click',function () {
            var text = $(this).text();
            region.text(text);
            mask.css('display','none');
            wish.css('display','none');
            img.attr('src','./images/up.png');
        })
    }
    /*
        打开关闭筛选和遮罩
     */
    function filtro() {
        var btn = $('.filtro').eq(0);
        var img = $('.filtro img');
        var filterList=$('.filtro-list').eq(0);
        var wish = $('.filtro-list').eq(0);

        btn.on("click",function () {
            if(wish.css('display') === 'none'){
                wish.css('display','flex');
                img.attr('src','./images/down.png');
                filterList.css('z-index',999);
                mask.css('display','block');
                $('.region-list').css('display','none')
            //关闭
            }else{
                wish.css('display','none');
                img.attr('src','./images/up.png');
                mask.css('display','none');
            }
        })
    }
    /*
        点击筛选高亮
     */
    function clickNature() {
        var natureList = $('.nature-list div');
        var btn = $('.nature-button button');
        var img = $('.filtro img');
        var wish = $('.filtro-list').eq(0);

        natureList.on('click',function () {
            $(this).addClass('nature-first').siblings().removeClass('nature-first');
        });
        btn.on('click',function () {
            wish.css('display','none');
            img.attr('src','./images/up.png');
            mask.css('display','none');
        })
    }
    /*
        更多
     */
    function morenAndMore() {
        var btn = $('.drugstore-more');
        var druglist = $('.drug-list').eq(0);
        var drugstoreList = $('.drugstore-list').eq(0);
        btn.on('click',function () {
            for (var i = 0; i < 3; i++) {
                var list_0 = druglist.clone();
                drugstoreList.append(list_0);
            }
        })
    }
});