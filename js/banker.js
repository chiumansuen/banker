var Max = []
var Allocation = []
var Need = []
var Resource
var Available
var Request
var safe = []
var Work_Allocation = []
var P = ['P0', 'P1', 'P2', 'P3', 'P4']

function run() {
    Work_Allocation = []
    Max = getMaxArr()
    Allocation = getAllocationArr()
    Need = getNeedArr(Max, Allocation)
    Resource = getResource()
    Available = getAvailable()
    Request = getRequest()

    if (true == tryAllot(Request.process_num, Request.data)) {
        printText('        ' + 'Allocation' + '     ' + 'Need' + '	  ' + 'Work+Allocation' + '  ' + '安全序列顺序' + '\n')
        for (var i = 0; i <= P.length - 1; i++) {
            printText(P[i] + '    ' + Allocation[i].A + '  ' + Allocation[i].B + '  ' + Allocation[i].C + '	     ' + Need[i].A + '  ' + Need[i].B + '  ' + Need[i].C + '	        ' + Work_Allocation[i].A + '  ' + Work_Allocation[i].B + '  ' + Work_Allocation[i].C + '	         ' + safe.indexOf(i) + '\n')
        }
        //console.log(safe)
        //console.log(Work_Allocation)
        //console.log(Allocation)
        //console.log(Need)
    } else {

    }
    // console.log(Allocation)
}

$(function() {
    setDefault()　　
});

Array.prototype.indexOf = function(el) {
    for (var i = 0, n = this.length; i < n; i++) {
        if (this[i] === el) {
            return i + 1;
        }
    }
    return null;
}

function Resource(A, B, C) {
    this.A = A;
    this.B = B;
    this.C = C;
}

//页面初始化设置的值
function setDefault() {
    // $("input[name='AM']").val('7,5,3');
    // $("input[name='BM']").val('3,2,2');
    // $("input[name='CM']").val('9,0,2');
    // $("input[name='DM']").val('2,2,2');
    // $("input[name='EM']").val('4,3,3');

    // $("input[name='AA']").val('0,1,0');
    // $("input[name='BA']").val('2,0,0');
    // $("input[name='CA']").val('3,0,2');
    // $("input[name='DA']").val('2,1,1');
    // $("input[name='EA']").val('0,0,2');

    // $("input[name='resource']").val('10,5,7');
    // $("input[name='request']").val('');
    // $("#process_num").val('-1');


//获取文件
    var getFileContent = function (fileInput, callback) {
            if (fileInput.files && fileInput.files.length > 0 && fileInput.files[0].size > 0) {
                //下面这一句相当于JQuery的：var file =$("#upload").prop('files')[0];
                var file = fileInput.files[0];
                if (window.FileReader) {
                    var reader = new FileReader();
                    //处理loadend事件。该事件在读取操作结束时（要么成功，要么失败）触发。
                    reader.onloadend = function (evt) {
                    	////判断操作是否完成
                        if (evt.target.readyState == FileReader.DONE) {
                            callback(evt.target.result); //回调结果
                        }
                    };
                    // 包含中文内容用gbk编码
                    reader.readAsText(file, 'gbk');
                }

            }
        };

        //upload内容变化时载入内容
         
        document.getElementById('upload').onchange = function () {
            
            getFileContent(this, function (str) {
                var f = [];
                f = str.split(" ");
                //console.log(f);
                $("input[name='AM']").val(f[0]);
			    $("input[name='BM']").val(f[1]);
			    $("input[name='CM']").val(f[2]);
			    $("input[name='DM']").val(f[3]);
			    $("input[name='EM']").val(f[4]);

			    $("input[name='AA']").val(f[5]);
			    $("input[name='BA']").val(f[6]);
			    $("input[name='CA']").val(f[7]);
			    $("input[name='DA']").val(f[8]);
			    $("input[name='EA']").val(f[9]);

			    $("input[name='resource']").val('10,5,7');
			    $("input[name='request']").val('');
			    $("#process_num").val('-1');
            });
        };

}

function reset_all(){
    $("input[name='AM']").val('7,5,3');
    $("input[name='BM']").val('3,2,2');
    $("input[name='CM']").val('9,0,2');
    $("input[name='DM']").val('2,2,2');
    $("input[name='EM']").val('4,3,3');

    $("input[name='AA']").val('0,1,0');
    $("input[name='BA']").val('2,0,0');
    $("input[name='CA']").val('3,0,2');
    $("input[name='DA']").val('2,1,1');
    $("input[name='EA']").val('0,0,2');

    $("input[name='resource']").val('10,5,7');
    $("input[name='request']").val('');
    $("#process_num").val('-1');
}

function getOneResource(str) {
    var t = []
    t = str.split(",")
    var oneResource = { 'A': parseInt(t[0]), 'B': parseInt(t[1]), 'C': parseInt(t[2]) };
    return oneResource
}

function getResource() {

    return getOneResource($("input[name='resource']").val())
}

function getRequest() {
    var data = getOneResource($('#request').val())
    //console.log(data)
    return { 'process_num': parseInt($('#process_num').val()), 'data': data }
    
}

function getMaxArr() {
    var max = []
    $(".Max input").each(function() {
        max.push(getOneResource($(this).val()))
    });

    return max
}

function getAllocationArr() {
    var allocation = []
    $(".Allocation input").each(function() {
        allocation.push(getOneResource($(this).val()))
    });

    return allocation
}

function getNeedArr(Max, Allocation) {
    var need = []
    for (var i = 0; i <= Max.length - 1; i++) {
        need[i] = { 'A': Max[i].A - Allocation[i].A, 'B': Max[i].B - Allocation[i].B, 'C': Max[i].C - Allocation[i].C };
    }
    return need
}


function getAvailable() {
    var available;
    var sumA = 0;
    var sumB = 0;
    var sumC = 0;
    //console.log(Allocation)
    for (var i = 0; i <= Allocation.length - 1; i++) {
        sumA += Allocation[i].A
        sumB += Allocation[i].B
        sumC += Allocation[i].C
    }
    available = { 'A': Resource.A - sumA, 'B': Resource.B - sumB, 'C': Resource.C - sumC };
    //console.log(available);
    return available

}
//安全性算法
function Safe() {
    var work = getAvailable();
    var finish = [false, false, false, false, false];
    var i;
    safe = []
    console.log(work);
    for (i = 0; i <= 4; i++) {
        if (finish[i] == false) {
            //是否有足够的资源分配给该进程
            if (Need[i].A <= work.A && Need[i].B <= work.B && Need[i].C <= work.C) {
                work.A += Allocation[i].A;
                work.B += Allocation[i].B;
                work.C += Allocation[i].C;
                Work_Allocation.splice(i, 0, { 'A': work.A, 'B': work.B, 'C': work.C });
                // printText( i + ' 的A ' +work.A + '\n')
                // printText( i + ' 的B ' +work.B + '\n')
                // printText( i + ' 的C ' +work.C + '\n')
                finish[i] = true;
                safe.push(i);
                i = -1; //重新开始遍历
            }
        }
    }

    for (i = 0; i <= 4; i++) {
        if (finish[i] == false) {
            return false;
        }
    }
    return true;
}

//银行家算法
function doAllot(process_num, request) {
    Available.A -= request.A;
    Available.B -= request.B;
    Available.C -= request.C;

    Allocation[process_num].A += request.A;
    Allocation[process_num].B += request.B;
    Allocation[process_num].C += request.C;

    Need[process_num].A -= request.A;
    Need[process_num].B -= request.B;
    Need[process_num].C -= request.C;
}

function RollBack(process_num, request) {
    Available.A += request.A;
    Available.B += request.B;
    Available.C += request.C;

    Allocation[process_num].A -= request.A;
    Allocation[process_num].B -= request.B;
    Allocation[process_num].C -= request.C;

    Need[process_num].A += request.A;
    Need[process_num].B += request.B;
    Need[process_num].C += request.C;
}

//尝试分配请求的资源 
function tryAllot(process_num, request) {
    //request向量需小于Need矩阵中对应的向量
    if (!(request.A <= Need[process_num].A && request.B <= Need[process_num].B && request.C <= Need[process_num].C)) {
        printText("分配失败。原因：请求资源大于需求资源。\n")
        return false;
    }

    //request向量需小于Available向量
    if (!(request.A <= Available.A && request.B <= Available.B && request.C <= Available.C)) {
        printText("分配失败。原因：请求资源大于可用资源。\n");
        return false;
    }

    //分配
    doAllot(process_num, request);

    //如果安全检查通过,则请求成功,否则回滚
    if (Safe()) {
        printText("分配成功。\n");
        return true;
    } else {
        printText("安全性检查失败。原因：系统将进入不安全状态，此时系统不分配资源。\n");
        //printText("正在回滚...\n");
        RollBack(process_num, request);
        printText("已回滚\n");
        return false;
    }

}

function printText(str) {
    $("#print").append(str)
}


// function clearPrint(){
// 	$("#print").val('');
// }