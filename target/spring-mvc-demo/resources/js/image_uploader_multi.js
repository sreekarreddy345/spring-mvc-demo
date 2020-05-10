/**
 * Created by Divinemaniac on 3/13/2016.
 */
ImageUploader = {
    input : null,
    drop : null,
    settings : {},
    progressbarInfo : null,
    beforeUpload: null,
    afterUploadDone : null,
    uploadingList : null,

    ProgressbarInfo : function(containerId) {
        this.container = document.getElementById(containerId);
        this.meter = this.container.firstElementChild;

        this.setProgress = function(percentComplete) {
            this.meter.setAttribute('style','width:'+percentComplete+'%');
            this.meter.innerHTML = percentComplete + "%";
        };

        this.hide = function() {
            this.container.classList.add("uk-hidden");
        };

        this.show = function() {
            this.container.classList.remove("uk-hidden");
        };

        this.reset = function() {
            this.setProgress(0);
        };
    },
    setOutputInfo : function(containerId,addMethod) {
        ImageUploader.uploadingList = new ALister({
            containerID : containerId,
            addItem : addMethod
        });
    },
    initialize : function(URL,inputId,dropId) {
        ImageUploader.settings = {
            action: URL, // upload url

            allow : '*.(jpg|jpeg|gif|png)', // allow only images

            filelimit : false,

            single : false,

            param: "images[]",

            type: 'json',

            loadend: function(settings,files) {
                console.log(settings);
                console.log(files);
            },

            loadstart: function(e) {
                //Clear previously uploaded images
                if(ImageUploader.uploadingList) {
                    ImageUploader.uploadingList.clear();
                }

                if(ImageUploader.progressbarInfo) {
                    ImageUploader.progressbarInfo.show();
                    ImageUploader.progressbarInfo.setProgress(0);
                }

                if(ImageUploader.beforeUpload) ImageUploader.beforeUpload.call();
                ImageUploader.displayUploadingItems();
            },

            progress: function(percent) {
                ImageUploader.progressbarInfo.setProgress(Math.ceil(percent));
            },

            allcomplete: function(data) {
                ImageUploader.progressbarInfo.setProgress(100);

                setTimeout(function(){
                    ImageUploader.progressbarInfo.hide();
                }, 250);

                UIkit.notify("Upload Complete!",{status:'info',pos:'bottom-center',timeout:3000});

                if(ImageUploader.afterUploadDone) ImageUploader.afterUploadDone.call(null,data);
            }
        };

        if(inputId) ImageUploader.setInput(inputId);
        if(dropId) ImageUploader.setDrop(dropId);
    },
    displayUploadingItems : function() {
        var input = ImageUploader.input.element[0];
        var totalFiles = input.files.length;
        var files = input.files;
        var totalValid = 0;

        var cnt = -1;
        if(window.FileReader) {
            var reader = new FileReader();
            reader.onloadend = function(e) {
                //Display this image as uploading
                if(e && ImageUploader.uploadingList) {
                    ImageUploader.uploadingList.addToUI(e.target.result);
                }
                ++cnt;
                if(cnt<totalFiles) {
                    if(files[cnt].type.match(/image.*/)) {
                        ++totalValid;
                        var _reader = new FileReader();
                        _reader.onloadend = arguments.callee;
                        reader.readAsDataURL(files[cnt]);
                    } else {
                        arguments.callee(null);
                    }
                } else if(totalValid > 0 ) {
                    UIkit.notify("Uploading "+totalValid+" images",{status:'info',pos:'bottom-center',timeout:2000});
                }
            };
            reader.onloadend(null);
        }
    },
    setInput : function(id) {
        ImageUploader.input = UIkit.uploadSelect($("#"+id), ImageUploader.settings);
    },
    setDrop : function(id) {
        ImageUploader.drop = UIkit.uploadDrop($("#"+id), ImageUploader.settings);
    },
    showUploadingItem : function(source) {

    }
};