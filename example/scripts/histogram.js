/**
 * Created by DELL on 2017/6/9.
 */
var histogram = dreamCharts.histogram;
histogram.SVG = Snap("#svg");

//定义需要的全局变量
var svg_width = histogram.SVG.attr("width"),svg_height = histogram.SVG.attr("height");
var wStart = svg_width*0.2,wEnd = svg_width*0.8,hStart = svg_height*0.1,hEnd = svg_height*0.8;//依次是直方图范围左上角顶点x坐标,直方图范围右下角顶点x坐标,直方图范围左上角顶点y坐标,直方图范围右下角顶点y坐标

//给数据
var data = [176,58,112,61,38,50,200,39,66,100,333,234];
var catogary = ["一月","二月","三月","四月","五月","六月","七月","八月","九月","十月","十一月","十二月"];

/******************y轴*************************/
histogram.drawYLine(wStart,hStart,hEnd)
    .attr({
        stroke:"#ff4e00",
        strokeWidth:"1px"
});
histogram.drawYGraduationLine(wStart,hStart,hEnd,25,data.length,wEnd-wStart)
    .attr({
        stroke: "#ffffff",
        strokeWidth: "1px",
        opacity:0.3
});
histogram.drawYText(wStart,hStart,hEnd,data.length,25,-35,7,data)
    .attr({
        fill:"#fffe00",
        strokeWidth:"1px"
});

/*******************x轴************************/
//x轴水平长线
histogram.drawXLine(wStart,wEnd,hEnd)
    .attr({
        stroke:"#ff4e00",
        strokeWidth:"1px"
    });
//x轴刻度线
histogram.drawXGraduationLine(wStart,wEnd,hEnd,data.length,85,15)
    .attr({
        stroke:"#ff4e00",
        strokeWidth:"1px"
});
//x轴文本值
histogram.drawXText(wStart,hEnd,wEnd,data.length,85,-15,30,catogary)
    .attr({
        fill:"#fffe00",
        strokeWidth:"1px"
});
/*******************直方图矩形方块******************/
var bar = histogram.drawBar(wStart,wEnd,hStart,hEnd,85,25,data.length,data,0.7)
    .attr({
        fill:"#0000ef",
        strokeWidth:"2px",
        stroke:"#ffffff"
});

for(let i = 0,len = bar.length;i < len;i++){
    bar[i].mousemove(function(){
        this.animate(
            {fill:"#ee0000"},
            500,mina.easein
        );
    }).mouseout(function(){
        this.animate(
            {fill:"#0000ef"},
            9000,mina.easein
        );
    });
}

