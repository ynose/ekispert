/**
 *  �w���ς��� Web �T�[�r�X
 *  �o�H�T���p�[�c
 *  �T���v���R�[�h
 *  http://webui.ekispert.com/doc/
 *  
 *  Version:2014-08-11
 *  
 *  Copyright (C) Val Laboratory Corporation. All rights reserved.
 **/

var expGuiCourseLight = function (pObject, config) {
    /*
    * Web�T�[�r�X�̐ݒ�
    */
    var apiURL = "http://api.ekispert.com/";
    /*
    * GET�p�����[�^����L�[�̐ݒ�
    */
    var key;
    var scripts = document.getElementsByTagName("script");
    for (var i = 0; i < scripts.length; i++) {
        var s = scripts[i];
        imagePath = s.src.substring(0, s.src.indexOf("expGuiCourseLight\.js"));

        if (s.src && s.src.match(/expGuiCourseLight\.js(\?.*)?/)) {
            var params = s.src.replace(/.+\?/, '');
            params = params.split("&");
            for (var i = 0; i < params.length; i++) {
                var tmp = params[i].split("=");
                if (tmp[0] == "key") {
                    key = unescape(tmp[1]);
                }
            }
            break;
        }
    }

    /*
    * �ϐ��S
    */
    var searchObj; // �T�������̃I�u�W�F�N�g
    var resultObj; // �T�����ʂ̃��N�G�X�g�I�u�W�F�N�g
    var result; // �T�����ʃI�u�W�F�N�g
    var callbackFunction; // �R�[���o�b�N�֐��̐ݒ�

    /*
    * �T�����s
    */
    function search(searchObject, callback) {
        if (typeof searchObject == "string") {
            // �T���I�u�W�F�N�g�𐶐�
            searchObj = createSearchInterface();
            // �p�����[�^�����
            var tmpParamList = searchObject.split('&');
            for (var i = 0; i < tmpParamList.length; i++) {
                var tmpParam = tmpParamList[i].split('=');
                if (tmpParam.length == 2) {
                    switch (tmpParam[0].toLowerCase()) {
                        case "from":
                            searchObj.setFrom(tmpParam[1]);
                            break;
                        case "to":
                            searchObj.setTo(tmpParam[1]);
                            break;
                        case "via":
                            searchObj.setVia(tmpParam[1]);
                            break;
                        case "date":
                            searchObj.setDate(tmpParam[1]);
                            break;
                        case "time":
                            searchObj.setTime(tmpParam[1]);
                            break;
                        case "searchtype":
                            searchObj.setSearchType(tmpParam[1]);
                            break;
                        case "plane":
                            searchObj.setPlane(tmpParam[1]);
                            break;
                        case "shinkansen":
                            searchObj.setShinkansen(tmpParam[1]);
                            break;
                        case "limitedExpress":
                            searchObj.setLimitedExpress(tmpParam[1]);
                            break;
                        case "bus":
                            searchObj.setBus(tmpParam[1]);
                            break;
                    }
                }
            }
        } else {
            // �T���I�u�W�F�N�g���w��
            searchObj = searchObject;
        }
        // �T���I�u�W�F�N�g�𕶎���ɕϊ�
        var searchWord = "";
        if (typeof searchObj.getFrom() != 'undefined') {
            searchWord += "&from=" + encodeURIComponent(searchObj.getFrom());
        }
        if (typeof searchObj.getTo() != 'undefined') {
            searchWord += "&to=" + encodeURIComponent(searchObj.getTo());
        }
        if (typeof searchObj.getVia() != 'undefined') {
            searchWord += "&via=" + encodeURIComponent(searchObj.getVia());
        }
        if (typeof searchObj.getDate() != 'undefined') {
            searchWord += "&date=" + searchObj.getDate();
        }
        if (typeof searchObj.getTime() != 'undefined') {
            searchWord += "&time=" + searchObj.getTime();
        }
        if (typeof searchObj.getSearchType() != 'undefined') {
            searchWord += "&searchType=" + searchObj.getSearchType();
        }
        if (typeof searchObj.getPlane() != 'undefined') {
            searchWord += "&plane=" + searchObj.getPlane();
        }
        if (typeof searchObj.getShinkansen() != 'undefined') {
            searchWord += "&shinkansen=" + searchObj.getShinkansen();
        }
        if (typeof searchObj.getLimitedExpress() != 'undefined') {
            searchWord += "&limitedExpress=" + searchObj.getLimitedExpress();
        }
        if (typeof searchObj.getBus() != 'undefined') {
            searchWord += "&bus=" + searchObj.getBus();
        }
        // �T��������̐���
        var url = apiURL + "v1/json/search/course/light?key=" + key + "&" + searchWord;
        // �R�[���o�b�N�֐��̐ݒ�
        callbackFunction = callback;
        //�T�����s���̓L�����Z��
        if (typeof resultObj != 'undefined') {
            resultObj.abort();
        }
        var JSON_object = {};
        if (window.XDomainRequest) {
            // IE�p
            resultObj = new XDomainRequest();
            resultObj.onload = function () {
                // OK���̏���
                JSON_object = JSON.parse(resultObj.responseText);
                setRooteUrl(JSON_object);
            };
            resultObj.onerror = function () {
                // �G���[���̏���
                if (typeof callbackFunction == 'function') {
                    callbackFunction(false);
                }
            };
        } else {
            resultObj = new XMLHttpRequest();
            resultObj.onreadystatechange = function () {
                var done = 4, ok = 200;
                if (resultObj.readyState == done && resultObj.status == ok) {
                    // OK���̏���
                    JSON_object = JSON.parse(resultObj.responseText);
                    setRooteUrl(JSON_object);
                } else if (resultObj.readyState == done && resultObj.status != ok) {
                    // �G���[���̏���
                    if (typeof callbackFunction == 'function') {
                        callbackFunction(false);
                    }
                }
            };
        }
        resultObj.open("GET", url, true);
        resultObj.send(null);
    }

    /*
    * JSON����͂��Č��ʂ��o��
    */
    function setRooteUrl(requestObject) {
        result = requestObject;
        if (typeof result.ResultSet.ResourceURI == 'undefined') {
            // ���s
            if (typeof callbackFunction == 'function') {
                callbackFunction(false);
            }
        } else {
            // ����
            if (typeof callbackFunction == 'function') {
                callbackFunction(true);
            }
        }
    }

    /*
    * ���ݒ�
    */
    function setConfigure(name, value) {
        if (name.toLowerCase() == String("apiURL").toLowerCase()) {
            apiURL = value;
        }
    }

    /*
    * �T���I�u�W�F�N�g�̃C���^�[�t�F�[�X��Ԃ�
    */
    function createSearchInterface() {
        return new searchInterface();
    };

    /*
    * �T���C���^�[�t�F�[�X�I�u�W�F�N�g
    */
    function searchInterface() {
        // �f�[�^���X�g
        var from;
        var to;
        var via;
        var date;
        var time;
        var searchType;
        var plane;
        var shinkansen;
        var limitedExpress;
        var bus;
        // �֐����X�g
        // from�ݒ�
        function setFrom(value) { from = value; };
        function getFrom() { return from; };
        this.setFrom = setFrom;
        this.getFrom = getFrom;
        // to�ݒ�
        function setTo(value) { to = value; };
        function getTo() { return to; };
        this.setTo = setTo;
        this.getTo = getTo;
        // via�ݒ�
        function setVia(value) { via = value; };
        function getVia() { return via; };
        this.setVia = setVia;
        this.getVia = getVia;
        // Date�ݒ�
        function setDate(value) { date = value; };
        function getDate() { return date; };
        this.setDate = setDate;
        this.getDate = getDate;
        // Time�ݒ�
        function setTime(value) { time = value; };
        function getTime() { return time; };
        this.setTime = setTime;
        this.getTime = getTime;
        // SearchType�ݒ�
        function setSearchType(value) { searchType = value; };
        function getSearchType() { return searchType; };
        this.setSearchType = setSearchType;
        this.getSearchType = getSearchType;
        // plane�ݒ�
        function setPlane(value) { plane = value; };
        function getPlane() { return plane; };
        this.setPlane = setPlane;
        this.getPlane = getPlane;
        // shinkansen�ݒ�
        function setShinkansen(value) { shinkansen = value; };
        function getShinkansen() { return shinkansen; };
        this.setShinkansen = setShinkansen;
        this.getShinkansen = getShinkansen;
        // limitedExpress�ݒ�
        function setLimitedExpress(value) { limitedExpress = value; };
        function getLimitedExpress() { return limitedExpress; };
        this.setLimitedExpress = setLimitedExpress;
        this.getLimitedExpress = getLimitedExpress;
        // bus�ݒ�
        function setBus(value) { bus = value; };
        function getBus() { return bus; };
        this.setBus = setBus;
        this.getBus = getBus;
    };

    /*
    * Roote��URL���擾
    */
    function getResourceURI() {
        if (typeof result != 'undefined') {
            return result.ResultSet.ResourceURI;
        } else {
            return;
        }
    }

    /*
    * ���p�ł���֐����X�g
    */
    this.search = search;
    this.createSearchInterface = createSearchInterface;
    this.setConfigure = setConfigure;
    this.getResourceURI = getResourceURI;

    /*
    * �萔���X�g
    */
    this.SEARCHTYPE_DEPARTURE = "departure";
    this.SEARCHTYPE_ARRIVAL = "arrival";
    this.SEARCHTYPE_FIRSTTRAIN = "firstTrain";
    this.SEARCHTYPE_LASTTRAIN = "lastTrain";
    this.SEARCHTYPE_PLAIN = "plain";
};
