/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

(function(){
    validator = {};
    //姓名
    validator.name = function(name){
        //中英文、数字、下划线，至少2个字符,至多20
        var reg = /^[\w\u4e00-\u9fa5]{2,20}$/;
        return name&&reg.test(name);
    };

    //手机号
    validator.mobile = function(mobile){
        var reg = /^1[35678][\d]{9}$/;      
        return mobile&&reg.test(mobile);
    };
    //密码，以字母开头，长度在6~18之间，只包含英文、数字和下划线
    validator.password = function(password){
        var reg = /^[a-zA-Z]\w{5,17}$/;      
        return password&&reg.test(password);
    };

    //邮编
    validator.zip = function(zip){
        var reg = /^[\d]{6}$/;
        return zip&&reg.test(zip);
    };

    //邮箱
    validator.mail = function(mail){
        var reg = /^[\w]+[\.\w]*[\w]+@[\w]+\.[\w]+$/;
        return mail && reg.test(mail);
    };

    //非空，不为空时返回true
    validator.notBlank = function(val){
        var reg = /\S/; 
        if(val == undefined){
            return false;
        }
        return reg.test(val);
    };

    //图片格式验证
    validator.pic = function(file){
        var reg = /.+(\.jpg|\.jpeg|\.gif|\.png)$/i; 
        if(file == undefined){
            return false;
        }
        return reg.test(file);
    };

    //最大长度验证
    validator.maxlength = function(str,length){
        if(typeof str=='undefined'||str.length>length)return false;
        return true;
    };

    //验证中文
    validator.isChinese = function(str){
        var re = /[^\u4e00-\u9fa5]/; 
        if(re.test(str)) return false; 
        return true; 
    };
    //字母和数字
    validator.isSpecialChar = function(str){
        var number=/^[0-9a-z]+$/i; 
        if(number.test(str)) return false; 
        return true; 
    };
    //验证码
    validator.verificationCode = function(code){
        var reg=/^[0-9]{6}$/i;
        return code&&reg.test(code);
    };

    //社保卡验证
    validator.medicareNumber = function(medicareNumber){
        var reg=/^[A-Za-z0-9]{0,30}$/i;
        return medicareNumber&&reg.test(medicareNumber);
    };
    validator.isIdCardNo = function(num){   
        num = num.toUpperCase();  
        //身份证号码为15位或者18位，15位时全为数字，18位前17位为数字，最后一位是校验位，可能为数字或字符X。   
        if (!(/(^\d{15}$)|(^\d{17}([0-9]|X)$)/.test(num)))   
        { 
          /*  alert('输入的身份证号长度不对，或者号码不符合规定！\n15位号码应全为数字，18位号码末位可以为数字或X。'); */
            return false; 
        } 
        //校验位按照ISO 7064:1983.MOD 11-2的规定生成，X可以认为是数字10。 
        //下面分别分析出生日期和校验位 
        var len, re; 
        len = num.length; 
        if (len == 15){ 
            re = new RegExp(/^(\d{6})(\d{2})(\d{2})(\d{2})(\d{3})$/); 
            var arrSplit = num.match(re); 

            //检查生日日期是否正确 
            var dtmBirth = new Date('19' + arrSplit[2] + '/' + arrSplit[3] + '/' + arrSplit[4]); 
            var bGoodDay; 
            bGoodDay = (dtmBirth.getYear() == Number(arrSplit[2])) && ((dtmBirth.getMonth() + 1) == Number(arrSplit[3])) && (dtmBirth.getDate() == Number(arrSplit[4])); 
            if(!bGoodDay){ 
               /* alert('输入的身份证号里出生日期不对！');   */
                return false; 
            } 
            else{ 
                //将15位身份证转成18位 
                //校验位按照ISO 7064:1983.MOD 11-2的规定生成，X可以认为是数字10。 
                var arrInt = new Array(7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2); 
                var arrCh = new Array('1', '0', 'X', '9', '8', '7', '6', '5', '4', '3', '2'); 
                var nTemp = 0, i;   
                num = num.substr(0, 6) + '19' + num.substr(6, num.length - 6); 
                for(i = 0; i < 17; i ++){ 
                    nTemp += num.substr(i, 1) * arrInt[i]; 
                } 
                num += arrCh[nTemp % 11];   
                return num;   
            }   
        } 
        if (len == 18){ 
            re = new RegExp(/^(\d{6})(\d{4})(\d{2})(\d{2})(\d{3})([0-9]|X)$/); 
            var arrSplit = num.match(re); 

            //检查生日日期是否正确 
            var dtmBirth = new Date(arrSplit[2] + "/" + arrSplit[3] + "/" + arrSplit[4]); 
            var bGoodDay; 
            bGoodDay = (dtmBirth.getFullYear() == Number(arrSplit[2])) && ((dtmBirth.getMonth() + 1) == Number(arrSplit[3])) && (dtmBirth.getDate() == Number(arrSplit[4])); 
            if (!bGoodDay){ 
              /*  alert('输入的身份证号里出生日期不对！'); */
                return false; 
            }else{ 
                //检验18位身份证的校验码是否正确。 
                //校验位按照ISO 7064:1983.MOD 11-2的规定生成，X可以认为是数字10。 
                var valnum; 
                var arrInt = new Array(7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2); 
                var arrCh = new Array('1', '0', 'X', '9', '8', '7', '6', '5', '4', '3', '2'); 
                var nTemp = 0, i; 
                for(i = 0; i < 17; i ++){ 
                    nTemp += num.substr(i, 1) * arrInt[i]; 
                } 
                valnum = arrCh[nTemp % 11]; 
                if (valnum != num.substr(17, 1)){ 
                    /*alert('18位身份证的校验码不正确！错误位：' + valnum); */
                    return false; 
                } 
                return true; 
            } 
        } 
        return false; 
    }
    //ikang.validator = validator;
})();

