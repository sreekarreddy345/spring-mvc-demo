/**
 * Created by divin on 5/3/2016.
 */
ProcessingModal = {
    timer: null,
    //msg: '',
    //icon: '',
    show : function(timer) {
        /*
        if(timer==null) timer = 5000;
        var full = "<i class='uk-icon-"+ProcessingModal.icon+"'></i> "+ProcessingModal.msg;
        return UIkit.notify({
            message : full,
            status  : 'info',
            timeout : timer,
            pos     : 'top-center'
        });
        */
        if(ProcessingModal.timer!=null) {
            clearTimeout(ProcessingModal.timer);
        }
        UIkit.modal("#processing-modal").show();
        if(timer!=null) ProcessingModal.timer = setTimeout(function() {
            ProcessingModal.hide();
        },timer);
    },
    hide : function(timer) {
        if(timer==null) {
            UIkit.modal("#processing-modal").hide();
            ProcessingModal.displayLoaderIcon();
        } else {
            ProcessingModal.timer = setTimeout(function() {
                ProcessingModal.hide();
            },timer);
        }
    },
    setText : function(text) {
        //ProcessingModal.msg = text;

        document.getElementById('processing-modal-text').innerHTML = text;
        return ProcessingModal;

        //return ProcessingModal;
    },
    setIcon : function(icon) {
        //ProcessingModal.icon = icon;

        document.getElementById('processing-modal-icon').setAttribute('class','uk-icon-'+icon);
        return ProcessingModal;

        //return ProcessingModal;
    },
    displayLoaderIcon : function() {
        ProcessingModal.icon = "circle-o-notch uk-icon-spin";

        document.getElementById('processing-modal-icon').setAttribute('class','uk-icon-circle-o-notch uk-icon-spin');
        return ProcessingModal;

        //return ProcessingModal;
    }
};