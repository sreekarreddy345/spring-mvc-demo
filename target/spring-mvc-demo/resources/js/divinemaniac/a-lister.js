/**
 * ALister Version 0.1
 * Created by Divinemaniac on 5/16/2016.
 */

    var ALister =  function(_settings) {
    /***************************************************************
     * Private Properties
     ***************************************************************/
        var _this = this;
        var settings = null;
        /*
         *******************
         * Properties:
         *******************
         * containerID: This is the ID of the container which contains the fetched records
         * container: This is the container which contains the fetched records
         * addItem: This property should be set to a function which will take in
         *          a json object and will return the UI HTML element for that object
         * uniqueProperty: The property of the json objects returned from the server
         *                 which uniquely identifies each object
         */

        /*
         * Fetching Related
         * *************************************
         */
        //The current page that the fetcher is in
        var currentPage = 0;
        //The page that was successfully loaded last
        var lastSuccessfullyLoadedPage = 0;

        var loading = false; //Indicates whether something is being loaded currently

        var itemsLoadedOnLastLoad = 0; //The number of items loaded on alst successful load

        /*
         * Item Event Listeners Related
         * *************************************
         */
        var itemEventListeners = {};
        /*
         * Selection Related
         * *************************************
         */
        var selectedCount = 0; //Indicates the number of items selected currently
        var inSelectMode = false; //Indicates if the list is in select mode

    /***************************************************************
     * Public Properties
     ***************************************************************/
        /*
         * Fetch Settings
         */
        this.fetchSettings = {};
        /*
         *******************
         * Properties:
         *******************
         * url : The URL from which to fetch items
         * before: The method to run just before fetching starts. Takes no arguments
         * after: The method to run after fetching is complete.
         *        First parameter is a string which either equals "success" or "failure"
         *        The second parameter is the response that was received (JSON) in case of success
         *        and in case of failure, it is the error that was thrown
         * method: The method to use for sending requests, GET/POST
         * limit:  The number of items to request in each fetch
         * clearOnEachLoad: clear the container on each fetch
         * addToTop: whether to add newly fetched items on top of the list
         */

        /*
         * Delete Settings
         */
        this.deleteSettings = {};
        /*
         *******************
         * Properties:
         *******************
         * url : The URL to send requests to in order to delete items
         * before: The method to run just before deletion starts. Takes no arguments
         * after: The method to run after deletion is complete.
         *        First parameter is a string which either equals "success" or "failure"
         *        The second parameter is the response that was received (JSON) in case of success
         *        and in case of failure, it is the error that was thrown
         * method: The method to use for sending requests, GET/POST
         * successProperty: The boolean property that will be returned which will indicate whether the item was successfully deleted
         */

        /*
         * Add Settings
         */
        this.addSettings = {};
        /*
         *******************
         * Properties:
         *******************
         * url : The URL to send requests to when adding a new item
         * before: The method to run just before sending the add request. Takes no arguments
         * after: The method to run after adding is complete.
         *        First parameter is a string which either equals "success" or "failure"
         *        The second parameter is the response that was received (JSON) in case of success
         *        and in case of failure, it is the error that was thrown
         * method: The method to use for sending requests, GET/POST
         * addToTop: whether to add newly added items on top of the list
         */

        /*
         * Selection Settings
         * *************************************
         */
        this.selectSettings = {};
        /*
         *******************
         * Properties:
         *******************
         * toggleClass : The class on which to listen to select events on
         * selectableContainerClass : The class to add to the container when it's items are selectable
         * selectedItemClass : The class to add to a selected item
         * selectLimit : limit on how many items can be selected. false if no limit.
         * onItemSelect : The callback to run when an item is selected
         *                Two parameters, the HTML element that was selected and a boolean with true = selected
         */
    /***************************************************************
     * Constructor
     ***************************************************************/

        //If the settings object has been passed,
        if(_settings) {
            settings = _settings;
            //Setup the containerID and container
            if(settings.containerID) settings.container = document.getElementById(settings.containerID);
            else if (settings.container) settings.containerID = settings.container.id;
            //Setup the unique property
            if(!settings.uniqueProperty) settings.uniqueProperty = "id";
        }

    /***************************************************************
     * Private Methods
     ***************************************************************/
        var handleSelectClick = function(e) {
            if(inSelectMode) {
                var selectedItemClass = _this.selectSettings.selectedItemClass;
                var elem = _this.getItemElement(e);
                //See if this item is already selected
                if(elem.classList.contains(selectedItemClass)) {
                    elem.classList.remove(selectedItemClass);
                    if(selectedCount>0) --selectedCount;
                    if(_this.selectSettings.onItemSelect) _this.selectSettings.onItemSelect(elem,false);
                }
                //Check if we have a limit on number of items to be selected
                //and also check if we have reached that limit
                else if(!_this.selectSettings.selectLimit || selectedCount<_this.selectSettings.selectLimit) {
                    elem.classList.add(selectedItemClass);
                    ++selectedCount;
                    if(_this.selectSettings.onItemSelect) _this.selectSettings.onItemSelect(elem,true);
                } else if(_this.selectSettings.selectLimit==1) {
                    //If select limit is 1, deselect previously selected item
                    _this.resetSelected();
                    handleSelectClick(elem);
                }
            }
        };



    /***************************************************************
     * Public Methods
     ***************************************************************/
        /******************
         * User Interface *
         ******************/
        /*
         * Converts the passed JSON object to an HTML element and displays it
         * This requires that addItem is set
         */
        this.addToUI = function(item,appendToTop) {
            if(!settings.addItem) return;
            var id = null; //The id to use to uniquely identify the element
            //Give IDs to the fetched UI elements
            //according to the uniqueProperty defined
            //if it exists
            if(item[settings.uniqueProperty]) {
                id = settings.containerID+"-"+item[settings.uniqueProperty];
                //See if this item has already been loaded into the UI.
                //If yes, update it
                var alreadyExists = document.getElementById(id);
                if(alreadyExists) return;
            }
            var elem = settings.addItem.call(null,item);

            if(id) elem.setAttribute('id',id);
            elem.classList.add('ALister-'+settings.containerID+'-item');
            if(!appendToTop) {
                settings.container.appendChild(elem);
            } else {
                settings.container.insertBefore(elem,settings.container.firstChild);
            }

        };


        /*
         * This method clears the content of the container
         */
       this.clearContainer = function() {
           settings.container.innerHTML = "";
        };

        this.clear = function() {
            settings.container.innerHTML = "";
        };


        /******************
         * Item Events    *
         ******************/
        /*
         * This method will add an item event listener
         * the _event is the event to listen to
         * the _class is the class name to listen for events on
         * the _handler is the function to call when the event fires
         */
        this.addItemEventListener = function(_event,_class,_handler) {
            var eventInfo = new ALister.ItemEventInfo(_class,_handler);
            if(!itemEventListeners[_event]) {
                itemEventListeners[_event] = [];
                settings.container.addEventListener(_event,function(e) {
                    var target = e.target || e.srcElement;
                    if(target) {
                        //Only check up to the container because we are not interested
                        //with events on levels upper than the container
                        while(target!=settings.container) {
                            var fired = itemEventListeners[_event].some(function (info) {
                                if (target.classList.contains(info.class)) {
                                    info.fireHandler(target,_this);
                                    fired = true;
                                    //We have found an event to fire
                                    return true;
                                }
                                //We did not find an event to fire, so look at another event
                                return false;
                            });
                            //We have already found an event to fire, so break out of loop
                            if(fired) break;
                            //We did not find a target, so go to the current node's parent
                            else target = target.parentNode;
                        }
                    }
                })
            }
            itemEventListeners[_event].push(eventInfo);
        };

        this.removeItemEventListener = function(_event,_class) {
            itemEventListeners[_event].some(function(info,index) {
                if(info.class == _class) {
                    itemEventListeners[_event].splice(index,1);
                    //We have found the required eventInfo
                    return true;
                }
                //We did not find the required eventInfo. look at next eventinfo
                return false;
            });
        };

        /******************
         * Item Selection *
         ******************/
        /*
         * This method makes the list items selectable
         */
        this.makeSelectable = function(_selectSettings) {
            _selectSettings.toggleClass = _selectSettings.toggleClass || this.selectSettings.toggleClass ||'ALister-'+settings.containerID+'-item';
            _selectSettings.selectableContainerClass = _selectSettings.selectableContainerClass || this.selectSettings.toggleClass || 'ALister-container-selectable';
            _selectSettings.selectedItemClass = _selectSettings.selectedItemClass || this.selectSettings.toggleClass || 'ALister-selected';
            _selectSettings.selectLimit = _selectSettings.selectLimit || this.selectSettings.toggleClass || false;
            _selectSettings.onItemSelect = _selectSettings.onItemSelect || this.selectSettings.onItemSelect || false;
            this.selectSettings = _selectSettings;
            //If the list is not already in select mode, add the event listener
            if(!inSelectMode) {
                //Add a click event listener for the select toggle
                this.addItemEventListener('click',_selectSettings.toggleClass,handleSelectClick);
                settings.container.classList.add(_selectSettings.selectableContainerClass);
            }
            inSelectMode = true;
        };

        /*
         * Makes the list items unselectable
         */
        this.makeUnselectable = function() {
            //If the list is in select mode, make it unselectable
            if(inSelectMode) {
                settings.container.classList.remove(this.selectSettings.selectableContainerClass);
                //Remove the event listener for the select toggle
                this.removeItemEventListener('click',this.selectSettings.toggleClass);
            }
            inSelectMode = false;
        };

        /*
         * Returns an array of selected item's HTML elements
         */
        this.getSelectedElements = function() {
            return document.getElementsByClassName(this.selectSettings.selectedItemClass);
        };

        /*
         * Gets the HTML element of the first selected item
         */
        this.getFirstSelectedElement = function() {
            var first = (this.getSelectedElements())[0];
            if(first) return first;
            else return false;
        };

        /*
         * Gets the unique field value of the first selected item
         */
        this.getFirstSelectedUnique = function() {
            var first = this.getFirstSelectedElement();
            if(first) return this.getUniqueValueFromId(first.id);
            else return false;
        };

        /*
         * Get an array of uniques of every selected item
         */
        this.getSelectedUniqueArray = function() {
            var uniques = [];
            var items = this.getSelectedElements();
            for(var i = 0; i<items.length; ++i) {
                uniques.push(_this.getUniqueValueFromId(items[i].id));
            }
            return uniques;
        };

        /*
         * Clears selections
         */
        this.resetSelected = function() {
            var items = this.getSelectedElements();
            //items is a nodelist and is automatically updated
            //So, each time we remove the class, items get removed
            while(items.length>0) {
                items[0].classList.remove(this.selectSettings.selectedItemClass);
            }
            selectedCount = 0;
        };

        /*
         * This method gets the item's unique field's value
         * from the item's id
         */
        this.getUniqueValueFromId = function(id) {
            return parseInt(id.slice(settings.containerID.length+1));
        };

        /******************
         * Fetching Items *
         ******************/

        /*
         * This method fetches items by sending requests to `fetchURL`
         */
        this.loadPage = function(_page,extraData) {
            if(loading || !this.fetchSettings) return false;
            loading = true;
            var fetchSettings = this.fetchSettings;
            if(!extraData) extraData = {};

            extraData.page = _page;
            if(fetchSettings.limit) extraData.limit = fetchSettings.limit;

            return $.ajax({
                url: fetchSettings.url,
                method: fetchSettings.method || "GET",
                data: extraData,
                dataType: "json",
                beforeSend: function() {
                    if(fetchSettings.before) fetchSettings.before.call();
                }
            }).done(function(items) {
                lastSuccessfullyLoadedPage = _page;
                //Check if all the items specified in limit have been loaded
                //If not, we need to load this page again on next reload
                itemsLoadedOnLastLoad = items.length;
                if(items && settings.addItem) {
                    if(_this.clearOnEachLoad) _this.clearContainer();
                    items.forEach(function(item) {
                        _this.addToUI(item,(fetchSettings.addToTop || false));
                    });
                }
                currentPage = _page;
                if(fetchSettings.after) fetchSettings.after.call(null,"success",items);
                loading = false;
            }).fail(function(a,b,error) {
                currentPage = lastSuccessfullyLoadedPage;
                var msg = JSON.parse(a.responseText).message || error;
                if(fetchSettings.after) fetchSettings.after.call(null,"failure",msg);
                loading = false;
            });
        };

        /*
         * This method fetches the current page
         */
        this.loadCurrentPage = function() {
            if(loading || !this.fetchSettings) return false;
            if(currentPage<1) currentPage = 1;
            return this.loadPage(currentPage);
        };

        /*
         * This method fetches the next page
         */
        this.loadNextPage = function() {
            if(loading || !this.fetchSettings) return false;
            if(itemsLoadedOnLastLoad < this.fetchSettings.limit)
                return this.loadCurrentPage();
            else
                return this.loadPage(currentPage+1);
        };

        /*
         * This method fetches the previous page
         */
        this.loadPreviousPage = function() {
            if(loading) return false;
            if(currentPage > 0)
                return this.loadPage(currentPage-1);
        };
        /******************
         * Adding an Item*
         ******************/
        /*
         * Sends the passed item as parameter to url in addSettings
         * where it is supposed to be added to the database
         */
        this.add = function(postItem) {
            if(!this.addSettings) return false;
            var addSettings = this.addSettings;

            return $.ajax({
                url: addSettings.url,
                method: addSettings.method || "POST",
                data: postItem,
                dataType: "json",
                beforeSend: function() {
                    if(addSettings.before) addSettings.before.call();
                }
            }).done(function(item) {
                if(item && settings.addItem)_this.addToUI(item,(addSettings.addToTop || false));
                if(addSettings.after) addSettings.after.call(null,"success",item);
            }).fail(function(a,b,error) {
                var msg = JSON.parse(a.responseText).message || error;
                if(addSettings.after) addSettings.after.call(null,"failure",msg);
            });
        };
        /******************
         * Deleting Items *
         ******************/

        /*
         * This method deletes items by sending requests to `deleteURL`
         * _uniqueArray is supposed to be passed an array of value of the unique field
         * corresponding to fields which are to be deleted.
         */
        this.deleteItemsByUnique = function(_uniqueArray,extraData) {
            if(!this.deleteSettings) return false;
            var deleteSettings = this.deleteSettings;
            if(!extraData) {
                extraData = {};
            }
            //Create the data to send to the server
            extraData[settings.uniqueProperty+'s'] = _uniqueArray;

            var successProperty = deleteSettings.successProperty || "success";
            var uniqueProperty = settings.uniqueProperty;
            return $.ajax({
                method: deleteSettings.method || "POST",
                url: deleteSettings.url,
                data: extraData,
                dataType: "json",
                beforeSend: function() {
                    if(deleteSettings.before) deleteSettings.before.call();
                }
            }).done(function(data) {
                if(!deleteSettings.after || (deleteSettings.after && !deleteSettings.after.call(null,"success",data))) {
                    //This is only performed if the callback returns false or there is no callback
                    //This removes all the returned uniques from the UI
                    data.forEach(function(item) {
                        if(item[uniqueProperty] && item[successProperty])
                            settings.container.removeChild(document.getElementById(settings.containerID+"-"+item[uniqueProperty]));
                    });
                }
            }).fail(function(a,b,error) {
                var msg = JSON.parse(a.responseText).message || error;
                if(deleteSettings.after) deleteSettings.after.call(null,"failure",msg);
            });
        };

        this.deleteSelected = function(_extraData) {
            if(!this.deleteSettings) return false;
            var ajax = this.deleteItemsByUnique(this.getSelectedUniqueArray(),_extraData);
            this.resetSelected();
            return ajax;
        };

        /*
         * This method will delete an item from the UI.
         * It also sends a request to deleteURL
         */
       this.deleteItem = function(item) {
           if(!this.deleteSettings) return false;
            //Get the UI element/item to delete
            var elem = this.getItemElement(item);
            var itemId = this.getUniqueValueFromId(elem.id);
            if(itemId) {
                this.deleteItemsByUnique([itemId]);
            }
        };

        /******************
         * Other Requests *
         ******************/
        /*
         * This method will send a request according to the passed settings array
         * ***********
         * Properties
         * ***********
         * url
         * before
         * after
         * method
         */
        this.sendRequestBySelected = function(requestSettings,extraData) {
            if(!requestSettings) return false;
            this.sendRequestByUnique(this.getSelectedUniqueArray(),requestSettings,extraData);
        };

        /*
         * This method will send a request to the given url
         * _uniqueArray is supposed to be passed an array of value of the unique field
         */
        this.sendRequestByUnique = function(_uniqueArray,requestSettings,extraData) {
            if(!requestSettings) return false;
            if(!extraData) extraData = {};

            //Create the data to send to the server
            extraData[settings.uniqueProperty+'s'] = _uniqueArray;
            return $.ajax({
                method: requestSettings.method || "POST",
                url: requestSettings.url,
                data: extraData,
                dataType: "json"
            }).done(function(data) {
                if(requestSettings.after) requestSettings.after.call(null,"success",data);
            }).fail(function(a,b,error) {
                var msg = JSON.parse(a.responseText).message || error;
                if(requestSettings.after) requestSettings.after.call(null,"failure",msg);
            });
        };

        /*************
         * Utilities *
         *************/
        this.getItemElementByUnique = function(unique) {
            return document.getElementById(settings.containerID+"-"+unique);
        };

        this.getUniqueByItem = function(elem) {
            return this.getUniqueValueFromId(this.getItemElement(elem).id);
        };

        /*
         * This method will get the item that the passed HTML
         * element corresponds to
         */
        this.getItemElement = function(item) {
            var parent = item.parentNode;
            while(parent!=settings.container) {
                parent = parent.parentNode;
                item = item.parentNode;
            }
            return item;
        };

        this.getSelectedCount = function() {
            return selectedCount;
        };

        this.getContainer = function() {
            return settings.container;
        };
    };

    /*
     * This class contains data on events on each item
     * the _class is the class name to listen for events on
     * the _handler is the function to call when the event fires
     */
    ALister.ItemEventInfo = function(_class,_handler) {
        var _this = this;
        this.class = _class;
        this.handler = _handler;
        this.fireHandler = function(argument,caller) {
            _this.handler.call(caller,argument);
        }
    };

