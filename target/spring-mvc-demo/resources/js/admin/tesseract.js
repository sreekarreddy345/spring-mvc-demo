var Tesseract = {};

/************************************
 * Selectors
 ***********************************/
Tesseract.Selector = function(url,onSelect) {
    var win = null;

    this.open = function() {
        win = window.open(url, "_blank", "menubar=no,status=no,toolbar=no,width=600,height=600");
        win.addEventListener('load',function() {
            win.onSelect = function(selected) {
                onSelect(selected);
                win.close();
            };
        });
    };

    this.close = function() {
        if(win) {
            win.close();
            win = null;
        }
    }
};

window.makeSelector = function(selectedGetter, selectButton, cancelButton) {
    window.onSelect = null;
    if(selectButton) {
        selectButton.addEventListener("click",function() {
            var selected = null;
            if(selectedGetter) selected = selectedGetter();
            else selected = null;

            if(window.onSelect) window.onSelect.call(null,selected);
        });
    }
    if(cancelButton) {
        cancelButton.addEventListener("click", function() {
            if(window.onSelect) window.onSelect.call(null,false);
        });
    }
};