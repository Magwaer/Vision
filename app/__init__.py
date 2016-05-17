#!/usr/bin/env python
# -*- coding: utf-8 -*-

from flask import Flask, render_template
from flask_mail import Mail
from flask.ext.sqlalchemy import SQLAlchemy
from flask.ext.security import Security, SQLAlchemyUserDatastore, \
    UserMixin, RoleMixin, login_required
from flask.ext.admin import Admin
from flask.ext import admin, login
from flask.ext.babel import Babel
from flask.ext.blogging import SQLAStorage, BloggingEngine
from sqlalchemy import create_engine, MetaData
from flask.ext.principal import Principal, RoleNeed, Permission, ActionNeed
from raven.contrib.flask import Sentry

app = Flask(__name__, static_url_path='/app/static')
app.config.from_object('config')
db = SQLAlchemy(app)

# blogging
engine = create_engine(app.config['SQLALCHEMY_DATABASE_URI'])
meta = MetaData()
sql_storage = SQLAStorage(engine, metadata=meta)
blog = BloggingEngine(app, sql_storage)
meta.create_all(bind=engine)

db.create_all()

mail = Mail(app)
babel = Babel(app)
sentry = Sentry(app)

# Needs
be_admin = RoleNeed('admin')
be_user = RoleNeed('user')
be_guest = RoleNeed('quest')
be_blogger = RoleNeed('blogger')

# Permissions
guest_per = Permission(be_guest)
guest_per.description = "Guest's permissions"

user_per = Permission(be_user)
user_per.description = "User's permissions"

blogger_per = Permission(be_blogger)
blogger_per.description = "Blogger's permissions"

admin_per = Permission(be_admin)
admin_per.description = "Admin's permissions"

apps_needs = [
    be_admin, be_user, be_guest, be_blogger
]

apps_permissions = [
    admin_per, user_per, guest_per, blogger_per
]

Principal(app)

from app.admin.views import MyAdminIndexView

backend = Admin(
    app
    , app.config['APP_NAME']
    , index_view=MyAdminIndexView()
    , template_mode='bootstrap3'
    , base_template='admin.html'
)


@app.errorhandler(404)
def not_found(error):
    return render_template('404.html'), 404


@app.errorhandler(500)
def error_500(error):
    return render_template('500.html'), 500


@app.errorhandler(403)
def error_403(error):
    return render_template('403.html'), 403


# Initialize flask-login
def init_login():
    login_manager = login.LoginManager()
    login_manager.init_app(app)

    # Create user loader function
    @login_manager.user_loader
    @blog.user_loader
    def load_user(user_id):
        return db.session.query(User).get(user_id)


# Initialize flask-login
init_login()

from app.users.models import User, Role

user_datastore = SQLAlchemyUserDatastore(db, User, Role)
security = Security(app, user_datastore)

from app.home.views import mod as homeModule

app.register_blueprint(homeModule)

from app.users.views import mod as userModule

app.register_blueprint(userModule)

# register page
from app.pages.views import mod as pageModule

app.register_blueprint(pageModule)

# register tree
from app.tree.views import mod as treeModule
app.register_blueprint(treeModule)

# register Lab Manager
from app.popups.views import lab as labModule
app.register_blueprint(labModule)


from app.admin.views import UserAdmin, RoleAdmin, FileView, ImageView, MenuView
from app.admin.models import File, Image

backend.add_view(UserAdmin(db.session))
backend.add_view(RoleAdmin(db.session))

backend.add_view(FileView(File, db.session))
backend.add_view(ImageView(Image, db.session))

backend.add_view(MenuView(name="Menu"))

# create tree table
from app.tree.models import Base
Base.metadata.create_all(engine)
#create lab table
from app.popups.models import BaseManager
BaseManager.metadata.create_all(engine)


# if app.config['DEBUG']:
#     import sys
#     sys.path.append('/home/vision/.pycharm_helpers/pydev')
#     import pydevd
#     pydevd.settrace('192.168.88.1', port=9004, stdoutToServer=True, stderrToServer=True)
