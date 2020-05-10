/**
 * Created by divinemaniac on 5/22/2016.
 */

/*
 * loadSettings:
 * url : the URL to send request to
 * data : extra data to send with the request
 * method: GET | POST
 */

//Requires JQuery
var EditMaker = function(_containerID,_loadSettings,_saveSettings) {
    this.setContainer = function(containerID) {
        container = $("#"+containerID);
        content = container.children("div").first();
        form = container.children("form").first();
        var editButton = form.find('.editmaker-save-button').first();
        var showFormButton = content.find('.editmaker-show-form-button').first();
        var showContentButton = form.find('.editmaker-show-content-button').first();

        saver = container.find(".editmaker-saver");
        loader = container.find(".editmaker-loader");

        if(saver) saver.hide();
        if(loader) loader.hide();

        var _this = this;

        showFormButton.on('click',function() {
            _this.showForm();
        });

        showContentButton.on('click',function() {
            _this.showContent();
        });

        editButton.on('click',function() {
            _this.save();
        });
        this.showContent(true);
    };

    this.getContainer = function() {
        return container;
    };

    this.showForm = function() {
        form.show(200);
        content.hide(300);
        formShowing = true;
    };

    this.showContent = function(_noAnim) {
        if(_noAnim) {
            content.show();
            form.hide();
        } else {
            content.show(200);
            form.hide(300);
        }

        formShowing = false;
    };

    this.toggle = function() {
        if(formShowing) this.showContent();
        else this.showForm();
    };

    this.load = function() {
        if (!this.loadSettings || !this.loadSettings.url) return;
        //Try to find this data locally
        var index = this.getIndexFromCache(this.loadSettings.url);
        if(index) {
            if (this.loadSettings.beforeLoad) this.loadSettings.beforeLoad.call();
            this.loadIntoUI(loaded[index].data);
            if (this.loadSettings.afterLoad) this.loadSettings.afterLoad.call(null, "success");
        } else {
            var extraData = this.loadSettings.data || {};
            var method = this.loadSettings.method || "GET";

            var _this = this;

            return $.ajax({
                method: method,
                url: this.loadSettings.url,
                data: extraData,
                dataType: "json",
                beforeSend: function () {
                    if(loader) {
                        loader.show(300);
                        form.hide(300);
                        content.hide(300);
                    }

                    if (_this.loadSettings.beforeLoad) _this.loadSettings.beforeLoad.call();
                }
            })
                .done(function (data) {
                    _this.loadIntoUI(data);
                    lastLoadedURL = _this.loadSettings.url;
                    loaded.push({
                        url: _this.loadSettings.url,
                        data: data
                    });
                    if(loader) {
                        loader.hide(300);
                        _this.showContent();
                    }
                    if (_this.loadSettings.afterLoad) _this.loadSettings.afterLoad.call(null, "success", data);
                })
                .fail(function (a, b, error) {
                    var msg = JSON.parse(a.responseText).message || error;
                    if (_this.loadSettings.afterLoad) _this.loadSettings.afterLoad.call(null, "failure", msg);
                });
        }
    };

    this.getIndexFromCache = function(url){
        var index = false;
        for(var i=0; i<loaded.length; ++i) {
            if(loaded[i].url == url) index = i;
        }
        return index;
    };

    this.save = function() {
        if(!this.saveSettings || !this.saveSettings.url) return;
        var extraData = this.saveSettings.data || {};
        var method = this.saveSettings.method || "POST";

        var _this = this;

        var formData = this.getFormData();

        return $.ajax ({
            method: method,
            url: _this.saveSettings.url,
            data: formData,
            dataType: "json",
            beforeSend: function() {
                if(saver) {
                    saver.show(300);
                    form.hide(300);
                    content.hide(300);
                }
                if(_this.saveSettings.beforeSave) _this.saveSettings.beforeSave.call();
            }
        })
        .done(function(data) {
            _this.loadIntoUI(formData);
            _this.updateCache({
                url:lastLoadedURL,
                data:formData
            });
            if(saver) {
                saver.hide(300);
                _this.showContent();
            }
            if(_this.saveSettings.afterSave) _this.saveSettings.afterSave.call(null,"success",data);
        })
        .fail(function(a,b,error) {
            var msg = JSON.parse(a.responseText).message || error;
            if(_this.saveSettings.afterSave) _this.saveSettings.afterSave.call(null,"failure",msg);
        });
    };

    this.loadIntoUI = function(data) {
        loadPropertyToUI(data);
    };

    this.getFormData = function() {
        //This will build the request object
        var fields = form.find(".editmaker-input");
        var tosend = {};
        for(var i=0; i<fields.length; ++i) {
            tosend[fields[i].name] = fields[i].value;
        }
        return tosend;

    };

    this.updateCache = function(item) {
        if(!item.url) return false;
        var index = this.getIndexFromCache(item.url);
        if(index) {
            var data = item.data;
            for (var property in data) {
                if (data.hasOwnProperty(property)) {
                    loaded[index].data[property] = data[property];
                }
            }
        } else {
            loaded.push(item);
        }

    };

    var loadPropertyToUI = function(data, name) {
        if(name) name +="-";
        else name = '';
        for (var property in data) {
            if (data.hasOwnProperty(property)) {
                if(data[property] && typeof data[property] === 'object') {
                    loadPropertyToUI(data[property],name+property);
                } else {
                    content.find(".editmaker-"+name+property).html(data[property]);
                    form.find(".editmaker-"+name+property).prop("value",data[property]);
                }
            }
        }
    };

    var loaded = [];

    this.deleteCache = function() {
        loaded = [];
    };

    var container = null;
    //The content div
    var content = null;
    //The edit form
    var form = null;

    var saver = null; //The saving loader
    var loader = null; //The loading loader

    var lastLoadedURL = null; //The url,data pair that was last loaded

    //Indicates if the form is showing
    var formShowing = false;

    this.setContainer(_containerID);

    this.loadSettings = _loadSettings; //Extra data to send on load
    this.saveSettings = _saveSettings; //Extra data to send on edit
};