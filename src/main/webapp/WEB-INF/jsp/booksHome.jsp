<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
    <title>Books Home</title>
    <link href="${pageContext.request.contextPath}/resources/css/uikit.css" rel="stylesheet">
    <script src="${pageContext.request.contextPath}/resources/js/jquery.min.js"></script>
    <script src="${pageContext.request.contextPath}/resources/js/uikit.js"></script>
</head>
<body>
<%@ include file="navbar.jsp" %>
<table class="uk-table uk-table-hover">
    <% %>
    <tr>
        <th>ID</th>
        <th>Book Name</th>
        <th>Author Name</th>
        <th>Subject</th>
    </tr>

    <c:forEach var="boo" items="${blist}">

        <tr>
            <td>${boo.id}</td>
            <td>${boo.bookName}</td>
            <td>${boo.authorName}</td>
            <td>${boo.subject}</td>
        </tr>

    </c:forEach>
</table>
</body>
</html>
