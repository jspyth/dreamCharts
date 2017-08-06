/**
 * Created by DELL on 2017/7/13.
 */
var svg = dreamCharts.getSVG("#svg");

//定义需要的全局变量
var svg_width = svg.attr("width"),svg_height = svg.attr("height");
var wStart = svg_width*0.05,wEnd = svg_width*0.95,hStart = svg_height*0.05,hEnd = svg_height*0.95;//依次是直方图范围左上角顶点x坐标,直方图范围右下角顶点x坐标,直方图范围左上角顶点y坐标,直方图范围右下角顶点y坐标

var data = {
    "name": "AAA",
    "children": [
    {
        "name": "BBB",
        "children": [
            {
                "name": "CCC",
                "children": [
                    {
                        "name": "DDD",
                        "children": [
                            {   "name": "EEE", "size": 1   },
                            {   "name": "EEE", "size": 2   },
                            {   "name": "EEE", "size": 13   },
                            {   "name": "EEE", "size": 4   },
                            {   "name": "EEE", "size": 5   }
                        ]
                    },
                    {   "name": "DDD", "size": 6   },
                    {
                        "name": "DDD",
                        "children": [
                            {   "name": "EEE", "size": 7   },
                            {   "name": "EEE", "size": 8   },
                            {   "name": "EEE", "size":9   },
                            {   "name": "EEE", "size": 10   }
                        ]
                    },
                    {   "name": "DDD", "size": 12   },
                    {   "name": "DDD", "size": 13   },
                    {
                        "name": "DDD",
                        "children": [
                            {   "name": "EEE", "size": 25   }
                        ]
                    }
                ]
            },
            {   "name": "CCC", "size": 15   },
            {   "name": "CCC", "size": 16   },
            {   "name": "CCC", "size": 17   },
            {   "name": "CCC", "size": 18   },
            {   "name": "CCC", "size": 19   }
        ]
    },
        {
            "name": "BBB",
            "children": [
                {   "name": "CCC", "size": 22   },
                {   "name": "CCC", "size": 23   },
                {   "name": "CCC", "size":24   },
                {   "name": "CCC", "size": 25   },
                {   "name": "CCC", "size": 26   }
            ]
        },
    {   "name": "BBB", "size": 21   },
    {
        "name": "BBB",
        "children": [
            {   "name": "CCC", "size": 22   },
            {   "name": "CCC", "size": 23   },
            {   "name": "CCC", "size":24   },
            {   "name": "CCC", "size": 25   }
        ]
    },
    {   "name": "BBB", "size": 27   }
]
};

var pack = dreamCharts.pack.settings({
    data:data,
    xOffsetText:-10,
    yOffsetText:60
});
pack.drawPack(wStart,wEnd,hStart,hEnd,"pack");

svg.selectAll(".pack5").attr({
   fill:"red"
});

