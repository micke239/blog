package com.mnilsson.blog.controller;

import java.io.BufferedReader;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStreamReader;

import javax.servlet.ServletContext;
import javax.servlet.http.HttpSession;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.context.ServletContextAware;

/**
 * Handles requests for the application home page.
 */
@Controller
public class VersionController implements ServletContextAware {
	
	private static final String POM_PROP_LOCATION = "/META-INF/maven/com.mnilsson/blog/pom.properties";
	private static final Logger log = LoggerFactory.getLogger(VersionController.class);
	private Version version;
	
	static class Version {
		public String builtAt;
		public String version;
	}
	
	/**
	 * Simply selects the home view to render by returning its name.
	 * @throws IOException 
	 */
	@ResponseBody
	@RequestMapping(value = "/version", method = RequestMethod.GET, produces = "application/json;charset=utf-8")
	public Version home(HttpSession session) throws IOException {
		return version;
	}

	@Override
	public void setServletContext(ServletContext servletContext) {
		version = new Version();
		try (BufferedReader reader = new BufferedReader(new InputStreamReader(new FileInputStream(servletContext.getRealPath(POM_PROP_LOCATION))))) {
			//ignore first
			reader.readLine();
			version.builtAt = reader.readLine().substring(1);
			version.version = reader.readLine().substring(8);
		} catch (IOException e) {
			log.error("Unable to read pom.properties", e);
		}
	}
	
}
