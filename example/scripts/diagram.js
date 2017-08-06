var svg = dreamCharts.getSVG("#svg");
//定义需要的全局变量
var svg_width = svg.attr("width"),svg_height = svg.attr("height");
var wStart = svg_width*0.25,wEnd = svg_width*0.85,hStart = svg_height*0.2,hEnd = svg_height*0.9;//依次是直方图范围左上角顶点x坐标,直方图范围右下角顶点x坐标,直方图范围左上角顶点y坐标,直方图范围右下角顶点y坐标

//给数据
var data = [176,58,112,61,38,50,200,139,66,100,333,234];
var data2 = [76,158,34,88,123,344,45,912,90,100,112,200];
var catogary = ["一月","二月","三月","四月","五月","六月","七月","八月","九月","十月","十一月","十二月"];

dreamCharts.calPublicMaxY([data,data2]);//如果多列数据就使用这个方法

var yAxis = dreamCharts.yAxis
    .settings(
    {
        data:data,
        ticks:6,
        distanceY:25,
        direction:-15,
        xOffsetText:-45,
        yOffsetText:7,
        getPublicMaxY:true
    }
);

yAxis.drawYLine(wStart,hStart,hEnd)
    .attr({
        stroke:"rgb(233,98,9)",
        strokeWidth:"1px"
    });
yAxis.drawYGraduationLine(wStart,hStart,hEnd,"yGraduationLine")
    .attr({
        stroke: "rgb(233,98,9)",
        strokeWidth: "1px"
    });
yAxis.drawYText(wStart,hStart,hEnd,"yText")
    .attr(
    {
        fill:"rgb(233,98,9)",
        strokeWidth:"1px"
    }
);

/*******************x轴************************/
var xAxis = dreamCharts.xAxis
    .settings({
        data:catogary,
        distanceX:85,
        xOffsetText:-15,
        yOffsetText:30,
        direction:15,
        allOffset:1,
        showCatogary:true
    });
//x轴水平长线
xAxis.drawXLine(wStart,wEnd-80,hEnd)
    .attr({
        stroke:"rgb(233,98,9)",
        strokeWidth:"1px"
    });

//x轴刻度线
xAxis.drawXGraduationLine(wStart,wEnd,hEnd,"xGraduationLine")
    .attr({
        stroke:"rgb(233,98,9)",
        strokeWidth:"1px",
        opacity:1
    });

//x轴文本值
xAxis.drawXText(wStart,hEnd,wEnd,"xText")
    .attr({
        fill:"rgb(233,98,9)",
        strokeWidth:"1px"
    });


/*画折线*/
var polyline1 = dreamCharts.polyLine.settings({
    data:data,
    allOffset:1,
    getPublicMaxY:true
});

polyline1.drawDiagram(wStart,wEnd,hStart,hEnd,"line1")
    .attr({
        strokeWidth:"2px",
        stroke:"blue",
        fill:"none"
    });

var polyline2 = dreamCharts.polyLine.settings({
    data:data2,
    allOffset:1,
    getPublicMaxY:true
});

polyline2.drawDiagram(wStart,wEnd,hStart,hEnd,"line2")
    .attr({
        strokeWidth:"2px",
        stroke:"yellow",
        fill:"none"
    });
var lengend1 = dreamCharts.legend.settings({
    width:55,
    height:25
});
lengend1.drawLegendRect(wStart,hStart-50)
    .attr({
        fill:"blue"
    });

lengend1.drawLegendText(wStart+70,hStart-29,"第一年")
    .attr({
        fill:"rgb(233,98,9)",
        strokeWidth:"1px"
    });

var lengend2 = dreamCharts.legend.settings({
    width:55,
    height:25
});
lengend2.drawLegendRect(wStart+130,hStart-50)
    .attr({
        fill:"yellow"
    });
lengend2.drawLegendText(wStart+190,hStart-29,"第二年")
    .attr({
        fill:"rgb(233,98,9)",
        strokeWidth:"1px"
    });