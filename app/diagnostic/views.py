#!/usr/bin/env python
# -*- coding: utf-8 -*-
from flask import Blueprint, request, render_template
from flask import flash, g, session
from app.users.models import User
from .storage import *
from flask import jsonify
from .forms import *
from app import admin_per
from flask import redirect, url_for
import json

lab = Blueprint('lab', __name__, url_prefix='/admin/lab')


@lab.route("/create/", methods=['POST'])
def create():
    if request.is_xhr:
        success = False
        id = 0
        if admin_per.require().can():
            if request.form['code'] and request.form['analyser']:
                id = add_lab(request.form['code'], request.form['analyser'])
                if id is not None:
                    success = True

        return jsonify({'success': success, 'id': id})
    else:
        # redirect to home
        return redirect(url_for('home.home'))


@lab.route("/get_all/", methods=['POST'])
def get_all():
    if request.is_xhr:
        success = False
        if admin_per.require().can():
            labs = get_labs()
            if labs is not None:
                success = True

        return jsonify({'success': success, 'labs': labs})
    else:
        # redirect to home
        return redirect(url_for('home.home'))


@lab.route("/delete/", methods=['POST'])
def delete():
    if request.is_xhr:
        success = False
        id = 0
        if admin_per.require().can():
            if request.form['id']:
                id = delete_lab(request.form['id'])
                if id is not None:
                    success = True

        return jsonify({'success': success, 'id': id})
    else:
        # redirect to home
        return redirect(url_for('home.home'))


@lab.route("/modify/", methods=['POST'])
def modify():
    if request.is_xhr:
        success = False
        if admin_per.require().can():
            if request.form['id'] and request.form['code'] and request.form['analyser']:
                success = modify_lab(request.form['id'], request.form['code'], request.form['analyser'])

        return jsonify({'success': success})
    else:
        # redirect to home
        return redirect(url_for('home.home'))


test_profile = Blueprint('test_profile', __name__, url_prefix='/admin/test_profile')


@test_profile.route("/get_value/", methods=['POST'])
def get_value():
    if request.is_xhr:
        data = {
            'electrical': get_selections(ElectricalProfile)
            , 'fluid': get_selections(FluidProfile)
        }
        return jsonify({'data': data})
    else:
        # redirect to home
        return redirect(url_for('home.home'))


@test_profile.route("/create/", methods=['POST'])
def create():
    if request.is_xhr:
        success = False
        res = None
        if admin_per.require().can():
            if request.form['select'] == 'electrical':
                res = create_electrical_profile(request.form)
            elif request.form['select'] == 'fluid':
                # print request.form
                res = create_fluid_profile(request.form)

            if res is not None:
                success = True

        return jsonify({'success': success})
    else:
        # redirect to home
        return redirect(url_for('home.home'))


@test_profile.route("/delete/", methods=['POST'])
def delete():
    if request.is_xhr:
        success = False
        if admin_per.require().can():
            if request.form['select'] == 'electrical':
                res = delete_electrical_profile(request.form['profile'])
            elif request.form['select'] == 'fluid':
                res = delete_fluid_profile(request.form['profile'])

            if res is not None:
                success = True

        return jsonify({'success': success, 'profile': request.form['profile']})
    else:
        # redirect to home
        return redirect(url_for('home.home'))


@test_profile.route("/modify/", methods=['POST'])
def modify():
    if request.is_xhr:
        success = False
        if admin_per.require().can():
            if request.form['select'] == 'electrical':
                res = modify_electrical_profile(request.form)
            elif request.form['select'] == 'fluid':
                res = modify_fluid_profile(request.form)

            if res is not None:
                success = True

        return jsonify({'success': success})
    else:
        # redirect to home
        return redirect(url_for('home.home'))


@test_profile.route("/get_profile/", methods=['POST'])
def get_profile():
    if request.is_xhr:
        success = False
        node = None
        if admin_per.require().can():
            if request.form['select'] == 'electrical':
                node = get_electrical_profile(request.form['selection'])
            elif request.form['select'] == 'fluid':
                node = get_fluid_profile(request.form['selection'])

            if node is not None:
                success = True

        return jsonify({'success': success, 'node': node})
    else:
        # redirect to home
        return redirect(url_for('home.home'))