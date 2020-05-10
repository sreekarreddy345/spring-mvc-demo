/**
 * Created by Divinemaniac on 3/13/2016.
 */
ImageIndex = {
    selectToggleClass: "img-list-thumbnail",
    selectableContainerClass: "selectable",
    selectedItemClass: "selected",
    selectText : " Select Multiple", //The text to display in the switch button when multiple selection is on
    deselectText : " Manage", //The text to display in the switch button when multiple selection is off
    imageList: null, //The ALister Class which will handle adding and removing of items
    mode: null, //The mode of the Image Index

    //Function Disablers
    disableSingleSelect: false,
    disableBulkSelect: false,
    disableManage: false,
    disableView: false,
    disableDelete: false,
    disableEdit: false,
    disableBulkDelete: false,

    //Callbacks
    onModeChange: null, //Method to call when the mode is changed
    onSelect: null, //Method to call when an item is selected

    //Sets the container for the image list
    //The passed parameter must be the id of the container to use
    setContainer: function(containerId) {
        ImageIndex.imageList = new ALister({
            containerID: containerId,
            uniqueProperty: 'id',
            addItem: ImageIndex.addNewItem
        });
        ImageIndex.imageList.fetchSettings.limit = 20;
    },
    //Sets the fetch URL
    setFetchURL: function(URL) {
        ImageIndex.imageList.fetchSettings.url = URL;
    },
    //Sets the delete URL
    setDeleteURL: function(URL) {
        if(ImageIndex.disableDelete) return;
        ImageIndex.imageList.deleteSettings.url = URL;
    },
    //Method that is called internally when the mode of the ImageIndex is changed.
    notifyModeChanged: function(oldMode) {
        ImageIndex.imageList.resetSelected();
        if(ImageIndex.onModeChange) ImageIndex.onModeChange.call(null,oldMode,ImageIndex.mode);
    },

    //Gets the current mode of the ImageIndex
    getMode : function() {
        return ImageIndex.mode;
    },

    //Changes the mode of ImageIndex to manage mode
    //calls the notifyModeChanged method
    setManageMode : function() {
        if(ImageIndex.disableManage || ImageIndex.mode=="manage") return;
        var oldMode = ImageIndex.mode;
        ImageIndex.mode = 'manage';
        ImageIndex.imageList.makeUnselectable();
        ImageIndex.notifyModeChanged(oldMode);
    },

    //Changes the mode of ImageIndex to Single selection mode
    //calls the notifyModeChanged method
    setSingleSelectMode : function() {
        if(ImageIndex.disableSingleSelect || ImageIndex.mode=="single_select") return;
        var oldMode = ImageIndex.mode;
        ImageIndex.mode = 'single_select';
        ImageIndex.imageList.makeSelectable({
            selectLimit : 1,
            toggleClass : ImageIndex.selectToggleClass,
            selectableContainerClass : ImageIndex.selectableContainerClass,
            selectedItemClass : ImageIndex.selectedItemClass
        });
        ImageIndex.notifyModeChanged(oldMode);
    },
    //Changes the mode of ImageIndex to Bulk/Multiple selection mode
    //calls the notifyModeChanged method
    setBulkSelectMode : function() {
        if(ImageIndex.disableBulkSelect || ImageIndex.mode=="bulk_select") return;
        var oldMode = ImageIndex.mode;
        ImageIndex.mode = 'bulk_select';
        ImageIndex.imageList.makeSelectable({
            selectLimit : false,
            toggleClass : ImageIndex.selectToggleClass,
            selectableContainerClass : ImageIndex.selectableContainerClass,
            selectedItemClass : ImageIndex.selectedItemClass
        });
        ImageIndex.notifyModeChanged(oldMode);
    },
    //Deletes selected items
    deleteSelected : function() {
        if(ImageIndex.disableDelete || ImageIndex.disableBulkDelete) return;
        var imageList = ImageIndex.imageList;
        if(imageList.getSelectedCount() > 0) {
            imageList.deleteSelected();
            return true;
        }
        return false;
    },

    //Defines the template for a new item in the list
    //calls the notifyModeChanged method
    addNewItem : function(imageData) {
        //The thumbnail container
        var container = document.createElement('div');
        //Add the original path to this image as a data attribute
        container.dataset.originalPath = ImageIndex.imageRoot+imageData.path+"/original/"+imageData.id+"."+imageData.extension;
        container.setAttribute('class','dstyle margin-top-10 img-list-item uk-width-1-2 uk-width-medium-1-6 uk-width-large-1-8 uk-width-small-1-4');

        //The figure
        var figure = document.createElement('figure');
        figure.setAttribute('id','img-id-'+imageData.id);
        figure.setAttribute('class','uk-overlay uk-overlay-hover img-list-thumbnail');

            //The image
            var image = new Image();
            image.src = ImageIndex.imageRoot+imageData.path+"/thumbnail/"+imageData.id+"."+imageData.extension;
            image.setAttribute('class', 'uk-overlay-scale');
            figure.appendChild(image);

            //The figcaption
            var figcaption = document.createElement('figcaption');
            figcaption.setAttribute('class','uk-overlay-panel uk-overlay-background uk-overlay-fade actions');
                if(!ImageIndex.disableEdit) {
                    //The link that holds the edit button
                    var editLink = document.createElement('a');
                    editLink.innerText = " Edit";
                    editLink.setAttribute('class', 'uk-icon-pencil-square img-list-item-edit');
                    figcaption.appendChild(editLink);
                }
                if(!ImageIndex.disableDelete) {
                    //The link that holds the delete button
                    var deleteLink = document.createElement('a');
                    deleteLink.innerText = " Delete";
                    deleteLink.setAttribute('class', 'uk-icon-trash img-list-item-delete');
                    figcaption.appendChild(deleteLink);
                }
            figure.appendChild(figcaption);

        container.appendChild(figure);

        //Image name div
        var nameDiv = document.createElement('div');
        nameDiv.setAttribute('class','img-name');
        if(imageData.name.length > 14) {
            nameDiv.innerText = imageData.name.substring(0,14) + "..";
        } else {
            nameDiv.innerText = imageData.name;
        }

        container.appendChild(nameDiv);

        //The span that displays the selected tick
        var span = document.createElement('span');
        span.setAttribute('class','uk-icon-check-circle');
        container.appendChild(span);
        return container;
    }
};