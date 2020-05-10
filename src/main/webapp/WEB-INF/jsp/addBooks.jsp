<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>


<html>
<head>
    <title>AddBooks</title>

    <link href="${pageContext.request.contextPath}/resources/css/uikit.css" rel="stylesheet">
    <script src="${pageContext.request.contextPath}/resources/js/jquery.min.js"></script>
    <script src="${pageContext.request.contextPath}/resources/js/uikit.js"></script>
    <script src="${pageContext.request.contextPath}/resources/js/core/dropdown.js"></script>

</head>
<body>
<form class="uk-form uk-form-horizontal" method="post" action="${pageContext.request.contextPath}/books/saveBooks">
    <legend>Book Information</legend>
    <div class="uk-form-row"></div>
    <label class="uk-form-label uk-text-bold">Book Name</label>
    <div class="uk-form-controls">
        <input type="text" name="bookname" required>
    </div>

    <div class="uk-form-row"></div>
    <label class="uk-form-label uk-text-bold">Author Name</label>
    <div class="uk-form-controls">
        <input type="text" name="authname" required>
    </div>

    <div class="uk-form-row"></div>
    <label class="uk-form-label uk-text-bold">Subject</label>
    <div class="uk-form-controls">
        <input type="text" name="subjname" required>
    </div>
    <div class="uk-form-row uk-width-1-4 uk-text-center">

        <input type="submit" class="uk-button-success uk-button-large ">

    </div>
</form>
</body>
</html>
