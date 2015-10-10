(function(window){
                                /*0--yesno 1--yes 2--no */
    window.ikangalert=function(yesno,strhead,strbody,fnsuccess,fnfalse){
        /*ready*/
        document.documentElement.style.height                 = '100%';
        document.getElementsByTagName('body')[0].style.height = '100%';

        /*mask*/
        var odivmask = document.createElement('div');
        odivmask.id                         = 'mask';
        odivmask.style.width                = '100%';
        odivmask.style.height               = '100%';
        odivmask.style.backgroundColor      = '#000000';
        odivmask.style.position             = 'fixed';
        odivmask.style.left                 = '0px';
        odivmask.style.top                  = '0px';
        odivmask.style.opacity              ='.4';

        /*warp*/
        var odivwarp = document.createElement('div');
        odivwarp.id                       = 'alertwarp';
        odivwarp.style.width              = '280px';
        //odivwarp.style.height             = '161px';
        odivwarp.style.borderWidth        = '1px';
        odivwarp.style.borderStyle        = 'solid';
        odivwarp.style.borderColor        = 'white';
        odivwarp.style.position           = 'fixed';
        odivwarp.style.left               = '50%';
        odivwarp.style.top                = '50%';
        odivwarp.style.marginLeft         = '-140px';
        odivwarp.style.marginTop          = '-80px';
        odivwarp.style.WebkitBorderRadius = '5px';

        /*head*/
        var odivhead = document.createElement('div');
        odivhead.style.height                        = '50px';
        odivhead.style.lineHeight                    = '50px';
        odivhead.style.textAlign                     = 'center';
        odivhead.style.backgroundColor               = '#15b6c3';
        odivhead.style.WebkitBorderTopLeftRadius     = '5px';
        odivhead.style.WebkitBorderTopRightRadius    = '5px';
        odivhead.style.fontSize                      = '14px;'
        odivhead.style.color                         = '#ffffff';
        odivhead.style.fontFamily                    = 'SimHei';
        odivhead.innerHTML                           = strhead;
        odivwarp.appendChild(odivhead);

        /*body*/
        var odivbody = document.createElement('div');
        odivbody.style.padding                           = '10px';
        odivbody.style.lineHeight                        = '20px';
        odivbody.style.textAlign                         = 'center';
        odivbody.style.backgroundColor                   = '#ffffff';
        odivbody.style.fontFamily                        = 'SimHei';
        odivbody.style.fontSize                          = '12px';
        odivbody.style.color                             = '#7c7e7e';
        odivbody.innerHTML                               = strbody;
        odivbody.style.borderBottom                      = '1px solid #e9e9e9';
        odivwarp.appendChild(odivbody);

        /*button area*/
        var odivbutton = document.createElement('div');
        odivbutton.style.height                           = '60px';
        odivbutton.style.overflow                         = 'hidden';
        odivbutton.style.WebkitBorderBottomLeftRadius     = '5px';
        odivbutton.style.WebkitBorderBottomRightRadius    = '5px';
        odivbutton.style.backgroundColor                  = '#ffffff';
        odivbutton.style.textAlign                        = 'center';
        odivwarp.appendChild(odivbutton);

        /*NO YES button*/
        var odivno  = document.createElement('div');
        odivno.id   = 'btncancel';
        var odivyes = document.createElement('div');
        odivyes.id  = 'btnconfirm';
        odivno.style.display               = 'inline-block';
        odivyes.style.display              = 'inline-block';
        odivno.style.marginTop             = '16px';
        odivyes.style.marginTop            = '16px';
        odivno.style.WebkitBorderRadius    = '5px';
        odivyes.style.WebkitBorderRadius   = '5px';
        odivno.style.height                = '30px';
        odivno.style.lineHeight            = '30px';
        odivyes.style.height               = '30px';
        odivyes.style.lineHeight           = '30px';
        odivno.style.textAlign             = 'center';
        odivyes.style.textAlign            = 'center';
        odivno.style.width                 = '70px';
        odivyes.style.width                = '70px';
        odivno.style.marginLeft            = '30px';
        odivyes.style.marginLeft           = '60px';
        odivno.style.backgroundColor       = '#c8c8c8';
        odivyes.style.backgroundColor      = '#ff6a30';
        odivno.style.color                 = '#ffffff';
        odivyes.style.color                = '#ffffff';
        odivyes.style.fontFamily           = 'SimHei';
        odivno.style.fontFamily            = 'SimHei';
        odivno.style.fontSize              = '14px';
        odivyes.style.fontSize             = '14px';
        odivno.innerHTML                   = '取消';
        odivyes.innerHTML                  = '确定';

        var btnyesno = yesno || 0 ;
        switch (btnyesno){
            case 0:
                odivbutton.appendChild(odivno);
                odivbutton.appendChild(odivyes);
            break;

            case 1:
                odivyes.style.marginLeft           = '0px';
                odivbutton.appendChild(odivyes);
            break;

            case 2:
                odivno.style.marginLeft            = '0px';
                odivbutton.appendChild(odivno);
            break;
        };

        document.body.appendChild(odivmask);
        document.body.appendChild(odivwarp);

        /*event cancel || event success*/
        $('#btncancel').on('tap',function(){
            document.body.removeChild(odivwarp);
            document.body.removeChild(odivmask);
            fnfalse && fnfalse();
        });

        $('#btnconfirm').on('tap',function(){
            document.body.removeChild(odivwarp);
            document.body.removeChild(odivmask);
            fnsuccess && fnsuccess ();
        });
    };
})(window);