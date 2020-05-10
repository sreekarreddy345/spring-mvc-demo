/**
 * Created by Divinemaniac on 3/13/2016.
 */
ImageUploader = {
    input : null,
    drop : null,
    settings : {},
    progressbarInfo : null,
    beforeUpload: null,
    afterSingleUpload : null,
    afterUploadDone : null,
    uploadingList : null,
    uploadingCount: 0,
    uploadedCount: 0,

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

            single : true,

            param: "imagefile",

            type: 'json',

            before: function(sett,files) {
                ImageUploader.showUploadingItem(files[0]);
                if(ImageUploader.progressbarInfo) {
                    ImageUploader.progressbarInfo.setProgress((ImageUploader.uploadedCount / ImageUploader.uploadingCount) * 100);
                }
            },
            beforeAll: function(files) {
                ImageUploader.uploadingCount = files.length;
                //Clear previously uploaded images
                if(ImageUploader.uploadingList) {
                    ImageUploader.uploadingList.clear();
                }

                if(ImageUploader.progressbarInfo) {
                    ImageUploader.progressbarInfo.show();
                    ImageUploader.progressbarInfo.setProgress(0);
                }

                if(ImageUploader.beforeUpload) ImageUploader.beforeUpload.call();
            },

            progress: function(percent) {
                if(ImageUploader.progressbarInfo) {
                    var progress = (ImageUploader.uploadedCount / ImageUploader.uploadingCount) * 100;
                    progress += percent/ImageUploader.uploadingCount;
                    ImageUploader.progressbarInfo.setProgress(Math.ceil(progress));
                }
            },
            complete: function(data) {
                ++ImageUploader.uploadedCount;
                if(ImageUploader.afterSingleUpload) ImageUploader.afterSingleUpload.call(null,data);
            },
            allcomplete: function() {
                ImageUploader.uploadingCount = 0;
                ImageUploader.uploadedCount = 0;
                ImageUploader.progressbarInfo.setProgress(100);

                setTimeout(function(){
                    ImageUploader.progressbarInfo.hide();
                }, 250);

                UIkit.notify("Upload Complete!",{status:'info',pos:'bottom-center',timeout:3000});
                if(ImageUploader.afterUploadDone) ImageUploader.afterUploadDone.call();
            }
        };

        if(inputId) ImageUploader.setInput(inputId);
        if(dropId) ImageUploader.setDrop(dropId);
    },
    setInput : function(id) {
        ImageUploader.input = UIkit.uploadSelect($("#"+id), ImageUploader.settings);
    },
    setDrop : function(id) {
        ImageUploader.drop = UIkit.uploadDrop($("#"+id), ImageUploader.settings);
    },
    showUploadingItem : function(source) {
        if(window.FileReader) {
            var reader = new FileReader();
            reader.onloadend = function(e) {
                //Display this image as uploading
                if(e && ImageUploader.uploadingList) {
                    ImageUploader.uploadingList.addToUI(e.target.result);
                }
            };
            reader.readAsDataURL(source);
        }
    }
};