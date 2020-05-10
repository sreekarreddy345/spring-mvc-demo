<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ page import="com.sreekar.beans.User" %>

<html>
<head>
    <title> Home </title>
    <script src="${pageContext.request.contextPath}/resources/js/jquery.min.js"></script>
    <script src="${pageContext.request.contextPath}/resources/js/uikit.js"></script>
</head>
<body>

<%@ include file="navbar.jsp" %>
<%--<a class="uk-text-middle uk-text-bold  uk-text-success"${user.username} </a>--%>
<% User user = (User) session.getAttribute("user");%>
<p> Hi <%=user.getUserName()%> Welcome to Student Management App.</p>
</body>
</html>
