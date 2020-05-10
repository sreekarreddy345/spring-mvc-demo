/**
 * Created by divin on 5/3/2016.
 */
ConfirmationModal = {
    onPositiveClick : null,
    onNegativeClick : null,
    show : function() {
        UIkit.modal("#confirmation-modal").show();
    },
    hide : function() {
        UIkit.modal("#confirmation-modal").hide();
        ConfirmationModal.setText('');
        ConfirmationModal.setIcon('exclamation-circle');
        ConfirmationModal.setPositiveButton('Yes',null);
        ConfirmationModal.setNegativeButton('No',null);
    },
    setText : function(text) {
        document.getElementById('confirmation-modal-text').innerHTML = text;
        return ConfirmationModal;
    },
    setIcon : function(icon) {
        document.getElementById('confirmation-modal-icon').setAttribute('class','uk-icon-'+icon);
        return ConfirmationModal;
    },
    setPositiveButton : function(text,onclick) {
        var button = document.getElementById('confirmation-modal-positive-button');
        if(text!=null) button.innerText = text;
        if(ConfirmationModal.onPositiveClick!=null) {
            button.removeEventListener('click',ConfirmationModal.onPositiveClick);
        }
        if(onclick!=null) {
            ConfirmationModal.onPositiveClick = function() {
                ConfirmationModal.hide();
                onclick();
            };
        } else {
            ConfirmationModal.onPositiveClick = function() {
                ConfirmationModal.hide();
            };
        }
        button.addEventListener('click',ConfirmationModal.onPositiveClick);
        return ConfirmationModal;
    },
    setNegativeButton : function(text,onclick) {
        var button = document.getElementById('confirmation-modal-negative-button');
        if(text!=null) button.innerText = text;
        if(ConfirmationModal.onNegativeClick!=null) {
            button.removeEventListener('click',ConfirmationModal.onNegativeClick);
        }
        if(onclick!=null) {
            ConfirmationModal.onNegativeClick = function() {
                ConfirmationModal.hide();
                onclick();
            };
        } else {
            ConfirmationModal.onNegativeClick = function() {
                ConfirmationModal.hide();
            };
        }
        button.addEventListener('click',ConfirmationModal.onNegativeClick);
        return ConfirmationModal;
    }
};