<%--
  Created by IntelliJ IDEA.
  User: sreek
  Date: 9/9/2019
  Time: 10:10 PM
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags" %>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>
<html>
<head>
    <title>Login Page</title>


    <link href="${pageContext.request.contextPath}/resources/css/uikit.css" rel="stylesheet">
    <script src="${pageContext.request.contextPath}/resources/js/jquery.min.js"></script>
    <script src="${pageContext.request.contextPath}/resources/js/uikit.js"></script>
    <script src="${pageContext.request.contextPath}/resources/js/core/dropdown.js"></script>

</head>
<body>

<form:form class="uk-form uk-form-horizontal" method="post" modelAttribute="user"
           action="${pageContext.request.contextPath}/login">

    <h3 class="uk-article-title"> Welcome to Student Management</h3>
    <hr class="uk-article-divider">
    <form:input path="userName" type="text" name="uname" placeholder="Username"/>
    <br/>
    <form:input path="password" type="text" name="pass" placeholder="Password"/>
    <br/>
    <br/>
    <input type="submit" value="Login"/>

</form:form>
</body>
</html>
