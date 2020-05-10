/*
import com.sreekar.Users;
import com.sreekar.dao.UserTransaction;

import javax.servlet.RequestDispatcher;
import java.io.IOException;

public class Login extends javax.servlet.http.HttpServlet {
    protected void doPost(javax.servlet.http.HttpServletRequest request, javax.servlet.http.HttpServletResponse response)
            throws javax.servlet.ServletException, IOException {
        UserTransaction u = new UserTransaction();

        String username = request.getParameter("uname");
        // response.getWriter().println(username);
        String password = request.getParameter("pass");

//        com.sreekar.Users un = new com.sreekar.Users(1, "sreekar", "sreekar", "admin");
        Users un = u.selectUser(username);
        //response.getWriter().println(un.getUsername());
        //response.getWriter().println(un.getPassword());
        //response.getWriter().println(un.getRole());
        if (username.equalsIgnoreCase(un.getUsername()) && password.equalsIgnoreCase(un.getPassword())) {

            request.getSession().setAttribute("user", un);
*/
/*            com.sreekar.dao.StudentTransaction std = new com.sreekar.dao.StudentTransaction();
            List<com.sreekar.beans.Student> sList = std.displayAll();
            //response.getWriter().println(sList.get(1).getAddress());
            request.getSession().setAttribute("slist", sList);*//*


            RequestDispatcher rd = request.getRequestDispatcher("/home.jsp");
            rd.forward(request, response);
        } else {
            response.getWriter().println("Login Failed");
        }
        //response.getWriter().println(l.get(0));

    }

    protected void doGet(javax.servlet.http.HttpServletRequest request, javax.servlet.http.HttpServletResponse response) throws javax.servlet.ServletException, IOException {
        //response.getWriter().println(request.getAttribute("user.username"));
        RequestDispatcher rd = request.getRequestDispatcher("/index.jsp");
        rd.forward(request, response);
    }
}
*/
